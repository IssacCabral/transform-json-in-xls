const xlsx = require("xlsx");

// objetos que serão retornados do banco de dados
const jsonData = [
  { name: "Diary", code: "diary_code", author: "Pagorn" },
  { name: "Note", code: "note_code", author: "Pagorn" },
  { name: "Medium", code: "medium_code", author: "Pagorn" },
];

// transforma os objetos em uma folha
const workSheet = xlsx.utils.json_to_sheet(jsonData);
// criar um novo book (aba dentro do excel)
const workBook = xlsx.utils.book_new();

// adiciona a folha dentro do book
xlsx.utils.book_append_sheet(workBook, workSheet, "Sheet 1");

// escreve a planilha excel em um formato específico do tipo buffer.
// Esse blob é um buffer que contém os dados do arquivo xls
const blob = xlsx.write(workBook, { bookType: "xls", type: "buffer" });

console.log({ blob });

// converte o buffer para base 64
const base64 = blob.toString("base64");

// reconverte base64 para o arquivo (essa parte não é necessária na lambda, quem faz é o front)
const myFile = xlsx.read(base64);

console.log({ myFile });

// cria o arquivo no diretório (essa parte não é necessária na lambda, quem faz é o front)
xlsx.writeFile(myFile, "./arquivo2.xls");
