var express = require("express");
var router = express.Router();
var connection = require("../config/database.js");
const Model_Kategori = require("../model/Model_Kategori");

router.get("/", async function (req, res, next) {
  let rows = await Model_Kategori.getAll();
  res.render("kategori/index", {
    data: rows,
  });
});

router.get("/create", function (req, res, next) {
  res.render("kategori/create", {
    nama_kategori: " ",
  });
});

router.post("/store", async function (req, res, next) {
  try {
    let { nama_kategori } = req.body;
    let Data = { nama_kategori }; // Assuming you want to store the 'nama_kategori' in an object

    await Model_Kategori.Store(Data);

    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/kategori");
  } catch (error) {
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/kategori");
  }
});

router.get("/update/(:id)", async function (req, res, next) {
  let id = req.params.id;
  let rows = await Model_Kategori.getId(id);

  res.render("kategori/update", {
    id: rows[0].id_kategori,
    nama_kategori: rows[0].nama_kategori,
  });
});

router.post("/update/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    let { nama_kategori } = req.body;
    let Data = { nama_kategori }; // Assuming you want to update the 'nama_kategori' field

    await Model_Kategori.Update(id, Data);

    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/kategori");
  } catch (error) {
    // Handle error, you can redirect or render an error page
    console.error(error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/kategori");
  }
});

router.get("/delete/(:id)", async function (req, res) {
  let id = req.params.id;
  await Model_Kategori.Delete(id);

  req.flash("success", "Berhasil menghapus data");
  res.redirect("/kategori");
});

module.exports = router;
