defmodule TeslaApi.Vehicle.State do
  defmodule Charge do
    defstruct [
      :charge_miles_added_rated,
      :charge_current_request,
      :charger_power,
      :managed_charging_start_time,
      :charger_phases,
      :charge_energy_added,
      :charger_voltage,
      :fast_charger_type,
      :time_to_full_charge,
      :ideal_battery_range,
      :usable_battery_level,
      :scheduled_charging_pending,
      :charger_actual_current,
      :est_battery_range,
      :charge_limit_soc_min,
      :charge_port_door_open,
      :managed_charging_active,
      :charge_limit_soc_max,
      :fast_charger_present,
      :fast_charger_brand,
      :scheduled_charging_start_time,
      :conn_charge_cable,
      :timestamp,
      :user_charge_enable_request,
      :charge_port_cold_weather_mode,
      :charge_to_max_range,
      :max_range_charge_counter,
      :charge_limit_soc_std,
      :charge_port_latch,
      :managed_charging_user_canceled,
      :charger_pilot_current,
      :trip_charging,
      :battery_range,
      :charging_state,
      :charge_rate,
      :not_enough_power_to_heat,
      :charge_limit_soc,
      :charge_enable_request,
      :charge_current_request_max,
      :battery_level,
      :charge_miles_added_ideal,
      :battery_heater_on
    ]

    def result(charge) when is_map(charge) do
      %__MODULE__{
        charge_miles_added_rated: charge["charge_miles_added_rated"],
        charge_current_request: charge["charge_current_request"],
        charger_power: charge["charger_power"],
        managed_charging_start_time: charge["managed_charging_start_time"],
        charger_phases: charge["charger_phases"],
        charge_energy_added: charge["charge_energy_added"],
        charger_voltage: charge["charger_voltage"],
        fast_charger_type: charge["fast_charger_type"],
        time_to_full_charge: charge["time_to_full_charge"],
        ideal_battery_range: charge["ideal_battery_range"],
        usable_battery_level: charge["usable_battery_level"],
        scheduled_charging_pending: charge["scheduled_charging_pending"],
        charger_actual_current: charge["charger_actual_current"],
        est_battery_range: charge["est_battery_range"],
        charge_limit_soc_min: charge["charge_limit_soc_min"],
        charge_port_door_open: charge["charge_port_door_open"],
        managed_charging_active: charge["managed_charging_active"],
        charge_limit_soc_max: charge["charge_limit_soc_max"],
        fast_charger_present: charge["fast_charger_present"],
        fast_charger_brand: charge["fast_charger_brand"],
        scheduled_charging_start_time: charge["scheduled_charging_start_time"],
        conn_charge_cable: charge["conn_charge_cable"],
        timestamp: charge["timestamp"],
        user_charge_enable_request: charge["user_charge_enable_request"],
        charge_port_cold_weather_mode: charge["charge_port_cold_weather_mode"],
        charge_to_max_range: charge["charge_to_max_range"],
        max_range_charge_counter: charge["max_range_charge_counter"],
        charge_limit_soc_std: charge["charge_limit_soc_std"],
        charge_port_latch: charge["charge_port_latch"],
        managed_charging_user_canceled: charge["managed_charging_user_canceled"],
        charger_pilot_current: charge["charger_pilot_current"],
        trip_charging: charge["trip_charging"],
        battery_range: charge["battery_range"],
        charging_state: charge["charging_state"],
        charge_rate: charge["charge_rate"],
        not_enough_power_to_heat: charge["not_enough_power_to_heat"],
        charge_limit_soc: charge["charge_limit_soc"],
        charge_enable_request: charge["charge_enable_request"],
        charge_current_request_max: charge["charge_current_request_max"],
        battery_level: charge["battery_level"],
        charge_miles_added_ideal: charge["charge_miles_added_ideal"],
        battery_heater_on: charge["battery_heater_on"]
      }
    end
  end

  defmodule Climate do
    defstruct [
      :battery_heater,
      :battery_heater_no_power,
      :climate_keeper_mode,
      :defrost_mode,
      :driver_temp_setting,
      :fan_status,
      :inside_temp,
      :is_auto_conditioning_on,
      :is_climate_on,
      :is_front_defroster_on,
      :is_preconditioning,
      :is_rear_defroster_on,
      :left_temp_direction,
      :max_avail_temp,
      :min_avail_temp,
      :outside_temp,
      :passenger_temp_setting,
      :remote_heater_control_enabled,
      :right_temp_direction,
      :seat_heater_left,
      :seat_heater_rear_center,
      :seat_heater_rear_left,
      :seat_heater_rear_right,
      :seat_heater_rear_left_back,
      :seat_heater_rear_right_back,
      :seat_heater_right,
      :side_mirror_heaters,
      :steering_wheel_heater,
      :smart_preconditioning,
      :timestamp,
      :wiper_blade_heater
    ]

    def result(climate) when is_map(climate) do
      %__MODULE__{
        battery_heater: climate["battery_heater"],
        battery_heater_no_power: climate["battery_heater_no_power"],
        climate_keeper_mode: climate["climate_keeper_mode"],
        defrost_mode: climate["defrost_mode"],
        driver_temp_setting: climate["driver_temp_setting"],
        fan_status: climate["fan_status"],
        inside_temp: climate["inside_temp"],
        is_auto_conditioning_on: climate["is_auto_conditioning_on"],
        is_climate_on: climate["is_climate_on"],
        is_front_defroster_on: climate["is_front_defroster_on"],
        is_preconditioning: climate["is_preconditioning"],
        is_rear_defroster_on: climate["is_rear_defroster_on"],
        left_temp_direction: climate["left_temp_direction"],
        max_avail_temp: climate["max_avail_temp"],
        min_avail_temp: climate["min_avail_temp"],
        outside_temp: climate["outside_temp"],
        passenger_temp_setting: climate["passenger_temp_setting"],
        remote_heater_control_enabled: climate["remote_heater_control_enabled"],
        right_temp_direction: climate["right_temp_direction"],
        seat_heater_left: climate["seat_heater_left"],
        seat_heater_rear_center: climate["seat_heater_rear_center"],
        seat_heater_rear_left: climate["seat_heater_rear_left"],
        seat_heater_rear_right: climate["seat_heater_rear_right"],
        seat_heater_rear_left_back: climate["seat_heater_rear_left_back"],
        seat_heater_rear_right_back: climate["seat_heater_rear_right_back"],
        seat_heater_right: climate["seat_heater_right"],
        side_mirror_heaters: climate["side_mirror_heaters"],
        steering_wheel_heater: climate["steering_wheel_heater"],
        smart_preconditioning: climate["smart_preconditioning"],
        timestamp: climate["timestamp"],
        wiper_blade_heater: climate["wiper_blade_heater"]
      }
    end
  end

  defmodule Drive do
    defstruct [
      :active_route_destination,
      :active_route_energy_at_arrival,
      :active_route_latitude,
      :active_route_longitude,
      :active_route_miles_to_arrival,
      :active_route_minutes_to_arrival,
      :active_route_traffic_minutes_delay,
      :gps_as_of,
      :heading,
      :latitude,
      :longitude,
      :native_type,
      :power,
      :shift_state,
      :speed,
      :timestamp
    ]

    def result(drive) when is_map(drive) do
      %__MODULE__{
        active_route_destination: drive["active_route_destination"],
        active_route_energy_at_arrival: drive["active_route_energy_at_arrival"],
        active_route_latitude: drive["active_route_latitude"],
        active_route_longitude: drive["active_route_longitude"],
        active_route_miles_to_arrival: drive["active_route_miles_to_arrival"],
        active_route_minutes_to_arrival: drive["active_route_minutes_to_arrival"],
        active_route_traffic_minutes_delay: drive["active_route_traffic_minutes_delay"],
        gps_as_of: drive["gps_as_of"],
        heading: drive["heading"],
        latitude: if(drive["native_location_supported"],do: drive["native_latitude"], else: drive["latitude"]),
        longitude: if(drive["native_location_supported"],do: drive["native_longitude"], else: drive["longitude"]),
        native_type: drive["native_type"],
        power: drive["power"],
        shift_state: drive["shift_state"],
        speed: drive["speed"],
        timestamp: drive["timestamp"]
      }
    end
  end

  defmodule VehicleConfig do
    defstruct [
      :can_accept_navigation_requests,
      :can_actuate_trunks,
      :car_special_type,
      :car_type,
      :charge_port_type,
      :eu_vehicle,
      :exterior_color,
      :has_air_suspension,
      :has_ludicrous_mode,
      :key_version,
      :motorized_charge_port,
      :perf_config,
      :plg,
      :rear_seat_heaters,
      :rear_seat_type,
      :rhd,
      :roof_color,
      :seat_type,
      :spoiler_type,
      :sun_roof_installed,
      :third_row_seats,
      :timestamp,
      :trim_badging,
      :use_range_badging,
      :wheel_type
    ]

    def result(vehicle_config) when is_map(vehicle_config) do
      %__MODULE__{
        can_accept_navigation_requests: vehicle_config["can_accept_navigation_requests"],
        can_actuate_trunks: vehicle_config["can_actuate_trunks"],
        car_special_type: vehicle_config["car_special_type"],
        car_type: vehicle_config["car_type"],
        charge_port_type: vehicle_config["charge_port_type"],
        eu_vehicle: vehicle_config["eu_vehicle"],
        exterior_color: vehicle_config["exterior_color"],
        has_air_suspension: vehicle_config["has_air_suspension"],
        has_ludicrous_mode: vehicle_config["has_ludicrous_mode"],
        key_version: vehicle_config["key_version"],
        motorized_charge_port: vehicle_config["motorized_charge_port"],
        perf_config: vehicle_config["perf_config"],
        plg: vehicle_config["plg"],
        rear_seat_heaters: vehicle_config["rear_seat_heaters"],
        rear_seat_type: vehicle_config["rear_seat_type"],
        rhd: vehicle_config["rhd"],
        roof_color: vehicle_config["roof_color"],
        seat_type: vehicle_config["seat_type"],
        spoiler_type: vehicle_config["spoiler_type"],
        sun_roof_installed: vehicle_config["sun_roof_installed"],
        third_row_seats: vehicle_config["third_row_seats"],
        timestamp: vehicle_config["timestamp"],
        trim_badging: vehicle_config["trim_badging"],
        use_range_badging: vehicle_config["use_range_badging"],
        wheel_type: vehicle_config["wheel_type"]
      }
    end
  end

  defmodule VehicleState do
    defstruct [
      :api_version,
      :autopark_state_v3,
      :autopark_style,
      :calendar_supported,
      :car_version,
      :center_display_state,
      :df,
      :dr,
      :ft,
      :homelink_device_count,
      :homelink_nearby,
      :is_user_present,
      :last_autopark_error,
      :locked,
      :notifications_supported,
      :odometer,
      :parsed_calendar_supported,
      :pf,
      :pr,
      :remote_start,
      :remote_start_enabled,
      :remote_start_supported,
      :rt,
      :fd_window,
      :fp_window,
      :rd_window,
      :rp_window,
      :sentry_mode,
      :sentry_mode_available,
      :smart_summon_available,
      :software_update,
      :summon_standby_mode_enabled,
      :sun_roof_percent_open,
      :sun_roof_state,
      :timestamp,
      :valet_mode,
      :valet_pin_needed,
      :vehicle_name,
      :tpms_pressure_fl,
      :tpms_pressure_fr,
      :tpms_pressure_rl,
      :tpms_pressure_rr,
      :tpms_soft_warning_fl,
      :tpms_soft_warning_fr,
      :tpms_soft_warning_rl,
      :tpms_soft_warning_rr
    ]

    defmodule SoftwareUpdate do
      defstruct [
        :download_perc,
        :expected_duration_sec,
        :install_perc,
        :scheduled_time_ms,
        :status,
        :version
      ]
    end

    def result(vehicle_state) when is_map(vehicle_state) do
      %__MODULE__{
        api_version: vehicle_state["api_version"],
        autopark_state_v3: vehicle_state["autopark_state_v3"],
        autopark_style: vehicle_state["autopark_style"],
        calendar_supported: vehicle_state["calendar_supported"],
        car_version: vehicle_state["car_version"],
        center_display_state: vehicle_state["center_display_state"],
        df: vehicle_state["df"],
        dr: vehicle_state["dr"],
        ft: vehicle_state["ft"],
        homelink_device_count: vehicle_state["homelink_device_count"],
        homelink_nearby: vehicle_state["homelink_nearby"],
        is_user_present: vehicle_state["is_user_present"],
        last_autopark_error: vehicle_state["last_autopark_error"],
        locked: vehicle_state["locked"],
        notifications_supported: vehicle_state["notifications_supported"],
        odometer: vehicle_state["odometer"],
        parsed_calendar_supported: vehicle_state["parsed_calendar_supported"],
        pf: vehicle_state["pf"],
        pr: vehicle_state["pr"],
        remote_start: vehicle_state["remote_start"],
        remote_start_enabled: vehicle_state["remote_start_enabled"],
        remote_start_supported: vehicle_state["remote_start_supported"],
        rt: vehicle_state["rt"],
        software_update: %SoftwareUpdate{
          download_perc: vehicle_state["software_update"]["download_perc"],
          expected_duration_sec: vehicle_state["software_update"]["expected_duration_sec"],
          install_perc: vehicle_state["software_update"]["install_perc"],
          scheduled_time_ms: vehicle_state["software_update"]["scheduled_time_ms"],
          status: vehicle_state["software_update"]["status"],
          version: vehicle_state["software_update"]["version"]
        },
        summon_standby_mode_enabled: vehicle_state["summon_standby_mode_enabled"],
        sun_roof_percent_open: vehicle_state["sun_roof_percent_open"],
        sun_roof_state: vehicle_state["sun_roof_state"],
        timestamp: vehicle_state["timestamp"],
        valet_mode: vehicle_state["valet_mode"],
        fd_window: vehicle_state["fd_window"],
        fp_window: vehicle_state["fp_window"],
        rd_window: vehicle_state["rd_window"],
        rp_window: vehicle_state["rp_window"],
        sentry_mode: vehicle_state["sentry_mode"],
        sentry_mode_available: vehicle_state["sentry_mode_available"],
        smart_summon_available: vehicle_state["smart_summon_available"],
        valet_pin_needed: vehicle_state["valet_pin_needed"],
        vehicle_name: vehicle_state["vehicle_name"],
        tpms_pressure_fl: vehicle_state["tpms_pressure_fl"],
        tpms_pressure_fr: vehicle_state["tpms_pressure_fr"],
        tpms_pressure_rl: vehicle_state["tpms_pressure_rl"],
        tpms_pressure_rr: vehicle_state["tpms_pressure_rr"],
        tpms_soft_warning_fl: vehicle_state["tpms_soft_warning_fl"],
        tpms_soft_warning_fr: vehicle_state["tpms_soft_warning_fr"],
        tpms_soft_warning_rl: vehicle_state["tpms_soft_warning_rl"],
        tpms_soft_warning_rr: vehicle_state["tpms_soft_warning_rr"]
      }
    end
  end
end
