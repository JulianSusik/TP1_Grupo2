const loginForm = document.querySelector(".main__primary__form"); //buscamos el formulario y lo guardamos en la cons loginForm

loginForm.addEventListener("submit", function(e) { //agregamos evento tipo sumbit ya que se ejecuta cuando el usuario envia
  e.preventDefault(); 

  const usuario = document.querySelector("#usuario").value;
  const contrasenia = document.querySelector("#contraseña").value;

  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || []; //se busca en el localstorage 'usuarios' 
                                                                                //  y el json.parse lo convierte en un array de objetos

  
  const usuarioValido = usuariosGuardados.find( //el metodo .find busca en el array el usuario que cumpla ambas coindiciones
    (user) => user.usuario === usuario && user.contrasenia === contrasenia
  );

  if (usuarioValido) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido))
  } else{
    alert("Usuario o contraseña incorrectos!");
    return;
  }

  alert(`Inicio exitoso`);

 window.location.href = "./paginas/pantalla-principal.html"; 
});