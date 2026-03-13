async function loadUsers(){

const res = await fetch("/api/admin/users");
const users = await res.json();

const tbody = document.querySelector("#usersTable tbody");

tbody.innerHTML = users.map(u => `

<tr>

<td>${u.id}</td>

<td>${u.name}</td>

<td>${u.email}</td>

<td>${u.phone || ""}</td>

<td>${u.role}</td>

<td>

<button class="edit" onclick="editUser(${u.id})">Edit</button>

<button class="delete" onclick="deleteUser(${u.id})">Delete</button>

</td>

</tr>

`).join("");

}

router.delete('/:id', authenticate, async (req, res) => {
  const userToDelete = await User.findByPk(req.params.id);

  if (!userToDelete) return res.status(404).json({ error: "User not found" });

  // Забрани изтриването на друг админ или на себе си
  if (userToDelete.role === 'admin') {
    if (userToDelete.id === req.user.id) {
      return res.status(403).json({ error: "You cannot delete yourself" });
    } else {
      return res.status(403).json({ error: "Cannot delete other admins" });
    }
  }

  await userToDelete.destroy();
  res.json({ message: "User deleted" });
});

async function editUser(id){
  const userRes = await fetch("/api/admin/users/" + id);
  const user = await userRes.json();

  const name = prompt("Name:", user.name);
  const email = prompt("Email:", user.email);
  const phone = prompt("Phone:", user.phone || "");
  const role = prompt("Role (user/admin):", user.role);

  if(!name || !email || !role) return;

  await fetch("/api/admin/users/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, phone, role })
  });

  loadUsers();
}

async function loadLost(){

const res = await fetch("/api/admin/lost");
const data = await res.json();

const tbody = document.querySelector("#lostTable tbody");

tbody.innerHTML = data.map(a=>`

<tr>

<td>${a.id}</td>
<td>${a.name || ""}</td>
<td>${a.type}</td>
<td>${a.last_seen_location || ""}</td>
<td>${new Date(a.date_time).toLocaleDateString()}</td>

</tr>

`).join("");

}

async function loadFound(){

const res = await fetch("/api/admin/found");
const data = await res.json();

const tbody = document.querySelector("#foundTable tbody");

tbody.innerHTML = data.map(a=>`

<tr>

<td>${a.id}</td>
<td>${a.type}</td>
<td>${a.found_location || ""}</td>
<td>${new Date(a.date_time).toLocaleDateString()}</td>

</tr>

`).join("");

}

loadUsers();
loadLost();
loadFound();