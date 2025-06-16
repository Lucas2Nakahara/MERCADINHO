function fazerCadastro() {
    const usuario = document.getElementById("cadastroUsuario").value.trim();
    const senha = document.getElementById("cadastroSenha").value.trim();

    if (!usuario || !senha) {
    alert("Preencha os dois campos para cadastrar.");
    return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

    if (usuarios[usuario]) {
    alert("Usuário já existe.");
    return;
    }

    usuarios[usuario] = senha;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Usuário cadastrado com sucesso!");
}

function fazerLogin() {
    const usuario = document.getElementById("loginUsuario").value.trim();
    const senha = document.getElementById("loginSenha").value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

    if (usuarios[usuario] === senha) {
    localStorage.setItem("logado", usuario); // salva quem está logado
    window.location.href = "loja.html";
    } else {
    alert("Usuário ou senha inválidos.");
    }
}
