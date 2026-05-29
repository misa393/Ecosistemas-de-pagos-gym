const API_URL = "http://localhost:5281/api"; // Ajusta al puerto de tu API

// Crear usuario
document.getElementById("usuarioForm").addEventListener("submit", async e => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const carne = document.getElementById("carne").value;

  const response = await fetch(`${API_URL}/Usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, carne })
  });

  if (response.ok) {
    const data = await response.json();
    agregarNotificacion(`Usuario creado: ${data.nombre} (ID: ${data.idUsuario})`);
  } else {
    agregarNotificacion("Error al crear usuario");
  }
});

// Crear cuota
document.getElementById("cuotaForm").addEventListener("submit", async e => {
  e.preventDefault();
  const idUsuario = parseInt(document.getElementById("idUsuario").value);
  const monto = parseFloat(document.getElementById("monto").value);
  const fecha = document.getElementById("fecha").value;

  const response = await fetch(`${API_URL}/Cuotas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idUsuario: idUsuario,
      monto: monto,
      estado: false,
      fecha: fecha
    })
  });

  if (response.ok) {
    const data = await response.json();
    agregarNotificacion(`Cuota creada para Usuario ${data.idUsuario} - Monto: ${data.monto}`);
  } else {
    agregarNotificacion("Error al crear cuota");
  }
});

// Consultar usuarios
document.getElementById("btnUsuarios").addEventListener("click", async () => {
  const response = await fetch(`${API_URL}/Usuarios`);
  if (response.ok) {
    const usuarios = await response.json();
    const lista = document.getElementById("listaUsuarios");
    lista.innerHTML = "";
    usuarios.forEach(u => {
      const li = document.createElement("li");
      li.textContent = `ID: ${u.idUsuario} - ${u.nombre} (${u.carne}) - Cuotas: ${u.cuotas.length}`;
      lista.appendChild(li);
    });
  } else {
    agregarNotificacion("Error al cargar usuarios");
  }
});

// Función de notificaciones
function agregarNotificacion(mensaje) {
  const item = document.createElement("li");
  item.textContent = mensaje;
  document.getElementById("notificaciones").appendChild(item);
}
