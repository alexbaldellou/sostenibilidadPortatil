const si = require("systeminformation");
const fs = require("fs");
const path = require("path");
const cron = require("node-cron");

const filePath = path.join(__dirname, "daily_metrics.json");

async function collectMetrics() {
  const time = new Date().toISOString();
  const uptime = await si.time();
  const cpu = await si.currentLoad();
  const mem = await si.mem();
  const battery = await si.battery();

  const metrics = {
    timestamp: time,
    uptime_hours: (uptime.uptime / 3600).toFixed(2),
    cpu_usage_percent: cpu.currentLoad.toFixed(2),
    ram_usage_percent: ((mem.active / mem.total) * 100).toFixed(2),
    battery_percent: battery.hasBattery ? battery.percent : null,
    battery_plugged: battery.hasBattery ? battery.isCharging : null,
  };

  let data = [];
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath));
  }

  data.push(metrics);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("✅ Métricas guardadas correctamente.");
}

// Ejecutar cada hora
// cron.schedule("0 * * * *", () => {
cron.schedule("*/5 * * * *", () => {
  console.log("⏱️ Ejecutando recolección de métricas...");
  collectMetrics();
});
