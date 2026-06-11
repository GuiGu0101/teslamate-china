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

export const LocalTime = {
  mounted() {
    this.el.innerText = toLocalTime(this.el.dataset.date);
  },

  updated() {
    this.el.innerText = toLocalTime(this.el.dataset.date);
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
  map,
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

    const path = this._empty() ? "" : `M0,${3} L-4,${5} L0,${-5} L4,${5} z}`;

    this._renderer._setPath(this, path);
  },
});

function createMap(opts) {
  const map = new M(opts.elId != null ? `map_${opts.elId}` : "map", opts);

  const osm = new TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
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

    const isArrow = this.el.dataset.marker === "arrow";
    const [lat, lng, heading] = $position.value.split(",");

    const marker = isArrow
      ? new DirectionArrow([lat, lng], heading)
      : new Marker([lat, lng], { icon });

    map.setView([lat, lng], 17);
    marker.addTo(map);

    // map.removeControl(map.zoomControl);

    // map.on('mouseover', function (e) { map.addControl(map.zoomControl); });
    // map.on('mouseout', function (e) { map.removeControl(map.zoomControl); });

    if (isArrow) {
      const setView = () => {
        const [lat, lng, heading] = $position.value.split(",");
        marker.setHeading(heading);
        marker.setLatLng([lat, lng]);
        map.setView([lat, lng], map.getZoom());
      };

      $position.addEventListener("change", setView);
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
