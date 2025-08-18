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
  const process = await si.processes();
  const network = await si.networkStats();

  const cpuPercent = cpu.currentLoad;
  const processActive = process.list.filter((p) => p.cpu > 1 || p.mem > 1);
  const networkActivity = network.reduce(
    (acc, r) => acc + r.rx_sec + r.tx_sec,
    0
  );

  const metrics = {
    timestamp: time,
    uptime_hours: (uptime.uptime / 3600).toFixed(2),
    cpu_usage_percent: cpu.currentLoad.toFixed(2),
    ram_usage_percent: ((mem.active / mem.total) * 100).toFixed(2),
    battery_percent: battery.hasBattery ? battery.percent : null,
    battery_plugged: battery.hasBattery ? battery.isCharging : null,
    isStandBy:
      cpuPercent < 5 && processActive.length === 0 && networkActivity < 1000,
  };

  let data = [];
  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath));
  }

  data.push(metrics);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log("✅ Métricas guardadas correctamente.");
}

// Ejecutar cada 5 minutos
cron.schedule("*/5 * * * *", () => {
  console.log("⏱️ Ejecutando recolección de métricas...");
  collectMetrics();
});
