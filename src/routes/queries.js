const express = require("express");
const query = require("../models/query");

const router = express.Router();

router.get("/query/:tabla", async (req, res) => {
  const { tabla } = req.params;
  const consulta = `SELECT * FROM ${tabla}`;

  if (!tabla)
    return res
      .status(400)
      .json({ error: "Falta la tabla a que quiere mostrar" });
  let res_consulta = await query(consulta);
  res.json({
    Consulta: res_consulta,
  });
});

router.post("/query/:tabla", async (req, res) => {
  const { tabla } = req.params;
  const { cuerpo } = req.body;
  if (!cuerpo)
    return res
      .status(400)
      .json({ error: "Faltan los valores que quiere insertar" });
  const consulta = `INSERT INTO ${tabla} SET ?`;
  let res_consulta = await query(consulta, cuerpo);
  if (res_consulta) {
    res.json({
      Consulta: "Se creo exitosamente",
    });
  } else {
    res.json({
      Consulta: "No se creo exitosamente",
    });
  }
});

router.put("/query/:tabla/:id", async (req, res) => {
  const { tabla } = req.params;
  const { id } = req.params;
  const { cuerpo } = req.body;
  if (!cuerpo) {
    return res
      .status(400)
      .json({ error: "Faltan los valores que quiere actualizar" });
  }
  const actualizaciones = Object.keys(cuerpo)
    .map((clave) => `${clave} = '${cuerpo[clave]}'`)
    .join(", ");
  let res_consulta = await query(
    `UPDATE ${tabla} SET  ${actualizaciones} WHERE id_${tabla} = ${id}`
  );
  if (res_consulta) {
    res.json({
      Consulta: "Se actualizo exitosamente",
    });
  } else {
    res.json({
      Consulta: "No se actualizo exitosamente",
    });
  }
});

router.delete("/query/:tabla/:id", async (req, res) => {
  const { tabla } = req.params;
  const { id } = req.params;
  if (!tabla)
    return res.status(400).json({
      error: "Ingrese la tabla en la que quiere eliminar un registro",
    });
  const consulta = `DELETE FROM ${tabla} WHERE id_${tabla} = ${id}`;
  let res_consulta = await query(consulta);
  if (res_consulta) {
    res.json({
      Consulta: "Se elimino exitosamente",
    });
  } else {
    res.json({
      Consulta: "No se elimino exitosamente",
    });
  }
});

module.exports = router;
