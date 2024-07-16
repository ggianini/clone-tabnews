export default function status(request, response) {
  response.status(200).json({
    code: "200",
    status: "OK",
    message: "alunos são exceção",
  });
}
