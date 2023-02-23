export const formatResult = ({ listado, results }) => {
  const formatted_results = [];

  switch (listado) {
    case "centros-educativos":
      results.map((result) => {
        result = result.split(",");
        const lans = result.slice(3, -1);
        console.log(lans);
        // MODIFICAR AQUI PARA SOLUCIONAR ERRO NA BÚSQUEDA DE CENTROS
        formatted_results.push({
          index: result[0],
          concello: result[1],
          centro: result[2],
          lans: lans.join(", "),
          tap: result.at(-1),
        });
      });

      break;
    case "hardware":
      results.map((result) => {
        result = result.split(",");
        console.log(result);
        formatted_results.push({
          garantia: result[9],
          marca: result[1],
          modelo: result[2],
          expediente: result[3],
          ns: result[4],
          tecnico: result[5],
          grupo_escalado: result[6],
          equipamento: result[7],
          so: result[8],
          tipo_hardware: result[10],
        });
      });
      break;
    case "contrasinais":
      results.map((result) => {
        result = result.split(",");
        formatted_results.push({
          index: result[0],
          nome: result[1],
          centro: result[2],
          contrasinal: result[3],
          descricion: result[4],
        });
      });
      break;
    default:
      break;
  }

  return formatted_results;
};
