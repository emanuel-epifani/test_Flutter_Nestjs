import 'package:dio/dio.dart';

main() {
  Dio dio = Dio();

  //Read
  readStudent();
}

void readStudent() async {
  try {
    var response = await Dio().get("http://localhost:8080/studente/readStudent").then((response) => print(response.data.toString()));
  } catch (e) {
    print(e);
  }
}
