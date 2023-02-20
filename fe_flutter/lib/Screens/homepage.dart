import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  List<Studente> listaDiStudenti = [];

  void getStudent() async {
    try {
      await Dio().get("http://localhost:8080/studente/readStudent").then((response) => {
            print(response.data),
            setState(() {
              for (var student in response.data) {
                listaDiStudenti.add(Studente.fromJson(student));
              }
              //listaDiStudenti = response.data as List<Studente>;
            })
          });
    } catch (e) {
      print(e);
    }
  }

  void clearStudent() {
    setState(() {
      listaDiStudenti = [];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Navigationbar")),
      body: Center(
        child: Column(children: [
          //2 bottoni "get studente" e "clear list"
          Container(
            padding: EdgeInsets.all(15),
            width: 700,
            child: Row(mainAxisAlignment: MainAxisAlignment.spaceAround, children: [
              //getStudent
              InkWell(
                  onTap: () => getStudent(),
                  child: Container(
                    padding: const EdgeInsets.all(5),
                    height: 45,
                    width: 120,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      color: Colors.blue,
                    ),
                    child: const Center(
                        child: Text(
                      "Get students",
                      style: TextStyle(color: Colors.white),
                    )),
                  )),

              //clearList
              InkWell(
                  onTap: () => clearStudent(),
                  child: Container(
                    padding: const EdgeInsets.all(5),
                    height: 45,
                    width: 120,
                    decoration: BoxDecoration(borderRadius: BorderRadius.circular(10), color: Colors.red),
                    child: const Center(
                        child: Text(
                      "Clear list",
                      style: TextStyle(color: Colors.white),
                    )),
                  )),
            ]),
          ),

          Column(
            children: [
              const Padding(
                padding: EdgeInsets.only(top: 10, bottom: 10),
                child: Text("Elenco studenti:"),
              ),
              if (listaDiStudenti.isNotEmpty)
                SizedBox(
                  height: 300,
                  width: 300,
                  child: ListView.builder(
                      itemCount: listaDiStudenti.length,
                      itemBuilder: (BuildContext context, int index) {
                        return Text("${listaDiStudenti[index].nome} ${listaDiStudenti[index].cognome}");
                      }),
                )
            ],
          ),
        ]),
      ),
    );
  }
}

// To parse this JSON data, do
//
//     final studente = studenteFromJson(jsonString);

Studente? studenteFromJson(String str) => Studente.fromJson(json.decode(str));

String studenteToJson(Studente? data) => json.encode(data!.toJson());

class Studente {
  Studente({
    required this.nome,
    required this.cognome,
    required this.genere,
  });

  String nome;
  String cognome;
  String genere;

  factory Studente.fromJson(Map<String, dynamic> json) => Studente(
        nome: json["nome"],
        cognome: json["cognome"],
        genere: json["genere"],
      );

  Map<String, dynamic> toJson() => {
        "nome": nome,
        "cognome": cognome,
        "genere": genere,
      };
}
