const SUPABASE_URL = "https://wmxadphlrihwnggguwti.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_P_fbg48EZ7lXehBTbJN21Q_EsMiT9TA";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const loginBox = document.getElementById("login-box");
const adminArea = document.getElementById("admin-area");
const loginError = document.getElementById("login-error");

// Check session on load
supabaseClient.auth.getSession().then(({ data }) => {
  if (data.session) {
    showAdmin();
  }
});

// Login
document.getElementById("login-btn")?.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    loginError.textContent = error.message;
  } else {
    showAdmin();
  }
});

// Logout
document.getElementById("logout-btn")?.addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  location.reload();
});

function showAdmin() {
  loginBox.style.display = "none";
  adminArea.style.display = "block";
}

console.log("Admin auth loaded");