const LANG = navigator.languages
  ? navigator.languages[0]
  : navigator.language || navigator.userLanguage;

function toLocalTime(dateStr, opts) {
  const date = new Date(dateStr);

  return date instanceof Date && !isNaN(date.valueOf())
    ? date.toLocaleTimeString(LANG, opts)
    : "–";
}

function toLocalDate(dateStr, opts) {
  const date = new Date(dateStr);

  return date instanceof Date && !isNaN(date.valueOf())
    ? date.toLocaleDateString(LANG, opts)
    : "–";
}

export const Dropdown = {
  mounted() {
    const $el = this.el;

    $el.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      $el.classList.toggle("is-active");
    });

    document.addEventListener("click", () => {
      $el.classList.remove("is-active");
    });
  },
};

// Navigates back in the browser history (e.g. to the Grafana dashboard the
// page was opened from) and falls back to the link's href if there is no
// history, e.g. when the page was opened in a new tab. Note that the history
// entry is not necessarily where the href points to: it is plain browser
// "Back" semantics, whatever the previous page in this tab was.
export const HistoryBack = {
  mounted() {
    this.el.addEventListener("click", (e) => {
      if (e.ctrlKey || e.shiftKey || e.metaKey || e.button === 1) return;

      if (window.history.length > 1) {
        e.preventDefault();
        window.history.back();
      }
    });
  },
};

export const LocalTime = {
  mounted() {
    this.el.innerText = toLocalTime(this.el.dataset.date);
  },

  updated() {
    this.el.innerText = toLocalTime(this.el.dataset.date);
  },
};

export const LocalDateTime = {
  render() {
    const dateStr = this.el.dataset.date;
    const date = toLocalDate(dateStr, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const time = toLocalTime(dateStr);
    this.el.innerText = `${date}, ${time}`;
  },

  mounted() {
    this.render();
  },

  updated() {
    this.render();
  },
};

export const LocalTimeRange = {
  exec() {
    const date = toLocalDate(this.el.dataset.startDate, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const time = [this.el.dataset.startDate, this.el.dataset.endDate]
      .map((date) =>
        toLocalTime(date, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      )
      .join(" – ");

    this.el.innerText = `${date}, ${time}`;
  },

  mounted() {
    this.exec();
  },
  updated() {
    this.exec();
  },
};

export const ConfirmGeoFenceDeletion = {
  mounted() {
    const { id, msg } = this.el.dataset;

    this.el.addEventListener("click", () => {
      if (window.confirm(msg)) {
        this.pushEvent("delete", { id });
      }
    });
  },
};

export const ConfirmAddressDeletion = {
  mounted() {
    const { id, msg } = this.el.dataset;

    this.el.addEventListener("click", () => {
      if (window.confirm(msg)) {
        this.pushEvent("delete", { id });
      }
    });
  },
};

import AMapLoader from "@amap/amap-jsapi-loader";

import {
  Map as M,
  TileLayer,
  LatLng,
  Control,
  Marker,
  Icon,
  Circle,
  CircleMarker,
  SVG,
} from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const icon = new Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 40],
  popupAnchor: [0, -25],
});

const DirectionArrow = CircleMarker.extend({
  initialize(latLng, heading, options) {
    this._heading = heading;
    CircleMarker.prototype.initialize.call(this, latLng, {
      fillOpacity: 1,
      radius: 5,
      ...options,
    });
  },

  setHeading(heading) {
    this._heading = heading;
    this.redraw();
  },

  _updatePath() {
    const { x, y } = this._point;

    if (this._heading === "")
      return CircleMarker.prototype._updatePath.call(this);

    this.getElement().setAttributeNS(
      null,
      "transform",
      `translate(${x},${y}) rotate(${this._heading})`,
    );

    const path = this._empty() ? "" : "M0,3 L-4,5 L0,-5 L4,5 z";

    this._renderer._setPath(this, path);
  },
});

// Safari resolves an SVG's intrinsic size as attribute / page zoom, so Leaflet's
// overlay pane renders displaced at any page zoom other than 100 % as soon as an
// author rule takes sizing away from the width/height attributes - Bulma's global
// `svg { width: auto; height: auto }` does exactly that. Mirroring the attributes
// into inline styles pins the used size; it is a no-op in every other browser.
// Layers on a custom pane get their own renderer and are not covered; the
// direction arrow and the geofence circle both live in the default overlay pane.
// Remove once Leaflet sets the size via style: Leaflet/Leaflet#10356
function createSvgRenderer() {
  const renderer = new SVG();

  renderer.on("update", () => {
    const el = renderer.getPane().querySelector("svg");
    if (!el) return;

    el.style.width = `${el.getAttribute("width")}px`;
    el.style.height = `${el.getAttribute("height")}px`;
  });

  return renderer;
}

function createMap(opts) {
  const map = new M(opts.elId != null ? `map_${opts.elId}` : "map", {
    ...opts,
    renderer: createSvgRenderer(),
  });

  const osm = new TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    referrerPolicy: "strict-origin-when-cross-origin",
  });

  if (opts.enableHybridLayer) {
    const hybrid = new TileLayer(
      "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}",
      { maxZoom: 20, subdomains: ["mt0", "mt1", "mt2", "mt3"] },
    );

    new Control.Layers({ OSM: osm, Hybrid: hybrid }).addTo(map);
  }

  map.addLayer(osm);

  return map;
}

export const SimpleMap = {
  mounted() {
    const $position = document.querySelector(`#position_${this.el.dataset.id}`);
    const $fullscreenButton = this.el.querySelector(".map-fullscreen-button");
    const $fullscreenIcon = $fullscreenButton
      ? $fullscreenButton.querySelector(".mdi")
      : null;
    this.positionInput = $position;
    this.fullscreenButton = $fullscreenButton;

    const map = createMap({
      elId: this.el.dataset.id,
      zoomControl: !!this.el.dataset.zoom,
      boxZoom: false,
      doubleClickZoom: false,
      keyboard: false,
      scrollWheelZoom: false,
      tap: false,
      dragging: false,
      touchZoom: false,
    });
    this.map = map;

    const isArrow = this.el.dataset.marker === "arrow";
    const [lat, lng, heading] = $position.value.split(",");

    const marker = isArrow
      ? new DirectionArrow([lat, lng], heading)
      : new Marker([lat, lng], { icon });

    const compactZoom = 17;
    map.setView([lat, lng], compactZoom);
    marker.addTo(map);

    const setZoomControlVisible = (visible) => {
      if (map.zoomControl) {
        if (visible) {
          map.addControl(map.zoomControl);
        } else {
          map.removeControl(map.zoomControl);
        }
      }
    };

    setZoomControlVisible(false);

    map.on("mouseover", () => setZoomControlVisible(true));
    map.on("mouseout", () => {
      if (!this.el.classList.contains("is-map-fullscreen")) {
        setZoomControlVisible(false);
      }
    });

    const setInteractive = (enabled) => {
      for (const handler of [
        map.boxZoom,
        map.doubleClickZoom,
        map.dragging,
        map.keyboard,
        map.scrollWheelZoom,
        map.tap,
        map.touchZoom,
      ]) {
        if (handler) {
          enabled ? handler.enable() : handler.disable();
        }
      }
    };

    const invalidateMapSize = (callback) => {
      window.setTimeout(() => {
        map.invalidateSize();
        if (callback) callback();
      }, 0);
    };

    const resetMapView = () => {
      map.setView(marker.getLatLng(), compactZoom, { animate: false });
    };

    const setFullscreenButtonState = (isFullscreen) => {
      const label = isFullscreen
        ? $fullscreenButton.dataset.exitLabel
        : $fullscreenButton.dataset.enterLabel;

      $fullscreenButton.setAttribute("aria-label", label);
      $fullscreenButton.dataset.tooltip = label;
      $fullscreenIcon.classList.toggle("mdi-fullscreen-exit", isFullscreen);
      $fullscreenIcon.classList.toggle("mdi-fullscreen", !isFullscreen);
    };

    const toggleFullscreen = () => {
      const isFullscreen = this.el.classList.toggle("is-map-fullscreen");
      document.documentElement.classList.toggle("is-clipped", isFullscreen);
      setFullscreenButtonState(isFullscreen);
      setZoomControlVisible(isFullscreen);
      setInteractive(isFullscreen);
      invalidateMapSize(isFullscreen ? null : resetMapView);
    };

    if ($fullscreenButton && $fullscreenIcon) {
      $fullscreenButton.dataset.enterLabel =
        $fullscreenButton.getAttribute("aria-label");
      this.handleFullscreenClick = toggleFullscreen;
      this.handleFullscreenKeyup = (e) => {
        if (
          e.key === "Escape" &&
          this.el.classList.contains("is-map-fullscreen")
        ) {
          toggleFullscreen();
        }
      };

      $fullscreenButton.addEventListener("click", this.handleFullscreenClick);
      document.addEventListener("keyup", this.handleFullscreenKeyup);
    }

    if (isArrow) {
      const setView = () => {
        const [lat, lng, heading] = $position.value.split(",");
        marker.setHeading(heading);
        marker.setLatLng([lat, lng]);
        map.setView([lat, lng], map.getZoom());
      };

      this.handlePositionChange = setView;
      $position.addEventListener("change", this.handlePositionChange);
    }
  },

  destroyed() {
    if (this.fullscreenButton && this.handleFullscreenClick) {
      this.fullscreenButton.removeEventListener(
        "click",
        this.handleFullscreenClick,
      );
    }

    if (this.handleFullscreenKeyup) {
      document.removeEventListener("keyup", this.handleFullscreenKeyup);
    }

    if (this.positionInput && this.handlePositionChange) {
      this.positionInput.removeEventListener(
        "change",
        this.handlePositionChange,
      );
    }

    if (this.el.classList.contains("is-map-fullscreen")) {
      document.documentElement.classList.remove("is-clipped");
    }

    if (this.map) {
      this.map.remove();
    }
  },
};

export const SimpleGDMap = {
  mounted() {
    const isDarkMode =
    document.documentElement.getAttribute("data-theme") === "dark";
    const $position = document.querySelector(`#position_${this.el.dataset.id}`);
    const isArrow = this.el.dataset.marker === "arrow";
    const [lat, lng, heading] = $position.value.split(",");
    AMapLoader.load({
      key: window._AMapSecurityConfig.apiKey, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    })
      .then((AMap) => {
        const map = new AMap.Map(`gdmap_${this.el.dataset.id}`, {
          // 设置地图容器id
          viewMode: "3D", // 是否为3D地图模式
          center: [116.433322, 39.900256],
          zoom: 14,
          mapStyle: isDarkMode ? "amap://styles/dark" : "amap://styles/normal",
        });

        const marker = new AMap.Marker({
          position: new AMap.LngLat(lng, lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          icon: isArrow
            ? "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png"
            : undefined,
          offset: isArrow ? new AMap.Pixel(-13, -26) : undefined,
          angle: isArrow ? heading : undefined,
          clickable: false,
        });

        map.add(marker);
        // 缩放地图到合适的视野级别
        map.setFitView([marker]);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};

export const TriggerChange = {
  updated() {
    this.el.dispatchEvent(new CustomEvent("change"));
  },
};

import("leaflet-control-geocoder");
import("@geoman-io/leaflet-geoman-free");

function createSearchBox(targetElement) {
  const searchBox = window.document.createElement("div");
  searchBox.className = "amap-searchBox";
  searchBox.innerHTML = `
    <table>
    <tr>
        <td>
            <label>请输入关键字：</label>
        </td>
    </tr>
    <tr>
        <td>
            <input id="tipinput"/>
        </td>
    </tr>
    </table>
    `;
  targetElement.append(searchBox);
  targetElement.style.position = "relative";
  return searchBox;
}

function createCircleEditor(CircleEditor, map, circle, inputEl) {
  const circleEditor = new CircleEditor(map, circle);
  circleEditor.on("move", function (event) {
    console.log("触发事件：move", event.lnglat);
    inputEl.$latitude.value = event.lnglat.getLat();
    inputEl.$longitude.value = event.lnglat.getLng();
  });

  circleEditor.on("adjust", function (event) {
    console.log("触发事件：adjust", event);
    inputEl.$radius.value = event.radius;
  });
  circleEditor.open();
  return () => {
    circleEditor.close();
  };
}

export const GDMap = {
  mounted() {
    const searchBox = createSearchBox(this.el);
    const geoFence = (name) =>
      document.querySelector(`input[name='geo_fence[${name}]']`);
    const inuptEl = {
      $radius: geoFence("radius"),
      $latitude: geoFence("latitude"),
      $longitude: geoFence("longitude"),
      $name: geoFence("name"),
    };
    const isDarkMode =
    document.documentElement.getAttribute("data-theme") === "dark";

    AMapLoader.load({
      key: window._AMapSecurityConfig.apiKey, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.CircleEditor", "AMap.AutoComplete"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        if (
          inuptEl.$latitude.value == "0.0" ||
          inuptEl.$longitude.value == "0.0"
        ) {
          inuptEl.$latitude.value = "39.900256";
          inuptEl.$longitude.value = "116.433322";
        }
        const center = new AMap.LngLat(
          inuptEl.$longitude.value,
          inuptEl.$latitude.value,
        );
        const map = new AMap.Map("gdmap", {
          // 设置地图容器id
          center: center,
          zoom: 14,
          mapStyle: isDarkMode ? "amap://styles/dark" : "amap://styles/normal",
        });

        const circle = new AMap.Circle({
          center: center,
          radius: inuptEl.$radius.value, //半径
          borderWeight: 3,
          fillOpacity: 0.4,
          fillColor: "#1791fc",
          zIndex: 50,
        });

        map.add(circle);
        // 缩放地图到合适的视野级别
        map.setFitView([circle]);
        let closeEditor = createCircleEditor(
          AMap.CircleEditor,
          map,
          circle,
          inuptEl,
        );
        map.getCity(function (info) {
          console.log(info);
          const { city, province } = info;
          const auto = new AMap.AutoComplete({
            input: "tipinput",
            city: city || province,
          });
          auto.on("select", (event) => {
            console.log(event.poi.location);
            const { location, name } = event.poi;
            inuptEl.$name.value = name;
            inuptEl.$latitude.value = location.getLat();
            inuptEl.$longitude.value = location.getLng();
            closeEditor();
            circle.setCenter(location);
            map.setCenter(location, true, 500);
            closeEditor = createCircleEditor(
              AMap.CircleEditor,
              map,
              circle,
              inuptEl,
            );
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  },
};

export const AddressChagneMap = {
  map: null,
  marker: null,

  mounted() {
    const isDarkMode =
    document.documentElement.getAttribute("data-theme") === "dark";
    const $position = document.querySelector(`#position_${this.el.dataset.id}`);
    const [lat, lng, name] = $position.value.split(",");

    AMapLoader.load({
      key: window._AMapSecurityConfig.apiKey, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    })
      .then((AMap) => {
        const center = new AMap.LngLat(lng, lat);
        const map = new AMap.Map("gdmap", {
          // 设置地图容器id
          center: center,
          zoom: 14,
          mapStyle: isDarkMode ? "amap://styles/dark" : "amap://styles/normal",
        });

        const marker = new AMap.Marker({
          position: center,
          label: {
            content: name,
          },
          draggable: true,
          zIndex: 50,
        });
        marker.on("dragend", (event) => {
          console.log("触发事件: dragend", event);
          this.pushEvent("search", {
            lat: event.lnglat.getLat(),
            lng: event.lnglat.getLng(),
          });
        });

        map.add(marker);
        // 缩放地图到合适的视野级别
        map.setFitView([marker]);
        const setView = () => {
          const [lat, lng, name] = $position.value.split(",");
          marker.setLabel({
            content: name,
          });
          marker.setPosition([lng, lat]);
          map.setFitView([marker]);
        };
        $position.addEventListener("change", setView);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};

export const Map = {
  mounted() {
    const geoFence = (name) =>
      document.querySelector(`input[name='geo_fence[${name}]']`);

    const $radius = geoFence("radius");
    const $latitude = geoFence("latitude");
    const $longitude = geoFence("longitude");

    const location = new LatLng($latitude.value, $longitude.value);

    const controlOpts = {
      position: "topleft",
      cutPolygon: false,
      drawCircle: false,
      drawCircleMarker: false,
      drawMarker: false,
      drawPolygon: false,
      drawPolyline: false,
      drawRectangle: false,
      removalMode: false,
    };

    const editOpts = {
      allowSelfIntersection: false,
      preventMarkerRemoval: true,
    };

    const map = createMap({ enableHybridLayer: true });
    map.setView(location, 17, { animate: false });
    map.pm.setLang(LANG);
    map.pm.addControls(controlOpts);
    map.pm.enableGlobalEditMode(editOpts);

    const circle = new Circle(location, { radius: $radius.value })
      .addTo(map)
      .on("pm:edit", (e) => {
        const { lat, lng } = e.target.getLatLng();
        const radius = Math.round(e.target.getRadius());

        $radius.value = radius;
        $latitude.value = lat;
        $longitude.value = lng;

        const mBox = map.getBounds();
        const cBox = circle.getBounds();
        const bounds = mBox.contains(cBox) ? mBox : cBox;
        map.fitBounds(bounds);
      });

    new Control.geocoder({ defaultMarkGeocode: false })
      .on("markgeocode", (e) => {
        const { bbox, center } = e.geocode;

        const poly = L.polygon([
          bbox.getSouthEast(),
          bbox.getNorthEast(),
          bbox.getNorthWest(),
          bbox.getSouthWest(),
        ]);

        circle.setLatLng(center);

        const lBox = poly.getBounds();
        const cBox = circle.getBounds();
        const bounds = cBox.contains(lBox) ? cBox : lBox;

        map.fitBounds(bounds);
        map.pm.enableGlobalEditMode();

        const { lat, lng } = center;
        $latitude.value = lat;
        $longitude.value = lng;
      })
      .addTo(map);

    map.fitBounds(circle.getBounds(), { animate: false });
  },
};

export const Modal = {
  _freeze() {
    document.documentElement.classList.add("is-clipped");
  },

  _unfreeze() {
    document.documentElement.classList.remove("is-clipped");
  },

  mounted() {
    // assumption: 'is-active' is always added after the initial mount
  },

  updated() {
    this.el.classList.contains("is-active") ? this._freeze() : this._unfreeze();
  },

  destroyed() {
    this._unfreeze();
  },
};

export const NumericInput = {
  mounted() {
    this.el.onkeypress = (evt) => {
      const charCode = evt.which ? evt.which : evt.keyCode;
      return !(charCode > 31 && (charCode < 48 || charCode > 57));
    };
  },
};

export const ThemeSelector = {
  mounted() {
    const select = this.el.querySelector("select");
    if (select) {
      select.addEventListener("change", (e) => {
        const themeMode = e.target.value;
        document.documentElement.setAttribute("data-theme-mode", themeMode);

        // Apply theme immediately
        let actualTheme = themeMode;
        if (themeMode === "system") {
          actualTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "dark"
            : "light";
        }
        document.documentElement.setAttribute("data-theme", actualTheme);
      });
    }
  },
};
