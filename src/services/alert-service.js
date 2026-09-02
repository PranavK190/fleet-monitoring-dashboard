import { supabase } from "../lib/supabase";

export async function getAlerts() {
  const { data: alerts, error: alertsError } = await supabase
    .from("emergency_events")
    .select("*")
    .order("created_at", { ascending: false });

  if (alertsError) {
    console.error("Error fetching alerts:", alertsError.message);
    throw alertsError;
  }

  const { data: drivers, error: driversError } = await supabase
    .from("drivers")
    .select("id, name");

  if (driversError) {
    console.error("Error fetching alert drivers:", driversError.message);
    throw driversError;
  }

  const { data: fleets, error: fleetsError } = await supabase
    .from("fleets")
    .select("id, fleet_name");

  if (fleetsError) {
    console.error("Error fetching alert fleets:", fleetsError.message);
    throw fleetsError;
  }

  const driverMap = new Map(
    drivers.map((driver) => [driver.id, driver.name])
  );

  const fleetMap = new Map(
    fleets.map((fleet) => [fleet.id, fleet.fleet_name])
  );

  return alerts.map((alert) => ({
    id: alert.id,
    driverName: driverMap.get(alert.driver_id) || null,
    fleetNo: fleetMap.get(alert.fleet_id) || null,
    status: alert.event_message,
    area: alert.location,
    driverId: alert.driver_id,
    fleetId: alert.fleet_id,
    eventType: alert.event_type,
    severity: alert.severity,
    resolved: alert.resolved,
    createdAt: alert.created_at,
  }));
}

export async function resolveAlert(alertId) {
  const { data, error } = await supabase
    .from("emergency_events")
    .update({
      resolved: true,
    })
    .eq("id", alertId)
    .select()
    .single();

  if (error) {
    console.error("Error resolving alert:", error.message);
    throw error;
  }

  return data;
}