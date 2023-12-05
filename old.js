
  // var response = await client.get({
  //   url: "https://afascursos.com.br/ead/login/?next=/ead/centro-de-aprendizagem/profletras-preparatorio-2022/aula/7814/%3Fclassroom%3D66",
  //   params: {
  //       'js_scenario': {"instructions":[
  //         {"fill": ["#id_username", ""]}, // Enter registration email
  //         {"fill": ["#id_password", ""]}, // Enter password
  //         {"click": "button"}, // Click on login
  //         {"wait": 15000}, // Wait for a second,
  //       ]},
  //       'screenshot': 'true'
  //   }
  // }).then((response)=> {
  //   fs.writeFileSync("./screenshots/login.png", response.data)
  // }) // Save the contents of the request (screenshot) to the 'path' file destination
  // .catch((e)=> {
  //   console.log("An error has occured: " + e.message);
  //   return { error: { type: 'login', message: e.message } };
  // });