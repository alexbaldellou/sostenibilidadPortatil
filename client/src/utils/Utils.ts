export const getPromedio = (listado: number[]) => {
  const promedio =
    listado.map(Number).reduce((a, b) => a + b, 0) / listado.length;
  return Number(promedio.toFixed(2));
};

export const getWhCPURAM = (listado: number[], maxWh: number) => {
  const promedio: number = getPromedio(listado);
  return (maxWh * promedio) / 100;
};
