export const getPromedio = (listado: number[]) => {
  const promedio =
    listado.map(Number).reduce((a, b) => a + b, 0) / listado.length;
  return Number(promedio.toFixed(2));
};

export const getWhCPURAM = (listado: number[], maxWh: number) => {
  const promedio: number = getPromedio(listado);
  return (maxWh * promedio) / 100;
};

export const getHoursToHMS = (h: number) => {
  const totalSeconds = Math.round(h * 3600);
  const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const ss = String(totalSeconds % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
};
