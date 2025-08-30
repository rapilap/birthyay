<template>
  <body>
    <div class="w-screen p-3">
      <h2 class="text-3xl">Ucapan dari teman-teman</h2>
      <p class="mt-3">Ucapin di sini ya, makasih😁</p>
      <form @submit.prevent="addUcapan">
        <input v-model="nama" placeholder="Nama" class="input" />
        <textarea
          v-model="pesan"
          placeholder="Tulis ucapan..."
          class="input"
        ></textarea>
        <button class="bg-white border border-white" type="submit">
          Kirim
        </button>
      </form>

      <!-- <ul>
        <li v-for="u in ucapan" :key="u.id">
          <strong>{{ u.nama }}</strong
          >: {{ u.pesan }}
        </li>
      </ul> -->
    </div>
  </body>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../../supabaseClient";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
// import "sweetalert2/src/sweetalert2.scss";

const ucapan = ref([]);
const nama = ref("");
const pesan = ref("");
const router = useRouter();

const loadUcapan = async () => {
  const { data, error } = await supabase
    .from("ucapan")
    .select("*")
    .order("created_at", { ascending: false });
  if (!error) ucapan.value = data;
};

const addUcapan = async () => {
  if (!nama.value || !pesan.value)
    return Swal.fire({
      title: "Nama atau ucapan kosong!",
      text: "Isi dulu yaaa",
      icon: "error",
      confirmButtonColor: "#242424",
    });

  const result = await Swal.fire({
    title: "Apakah data sudah benar?",
    showCancelButton: true,
    confirmButtonText: "Ya!",
    confirmButtonColor: "#242424",
    cancelButtonText: "Batal",
    cancelButtonColor: "#FF0000",
  });

  if (!result.isConfirmed) {
    [{ nama: nama.value, pesan: pesan.value }];
    Swal.fire({
      title: "Data dibatalkan!",
      icon: "info",
      confirmButtonColor: "#242424",
    });
    return;
  } else if (result.isConfirmed) {
    Swal.fire({
      title: "Data berhasil dimasukkan!",
      icon: "success",
      confirmButtonColor: "#242424",
    });

    router.push("/");
  }
  const { error } = await supabase
    .from("ucapan")
    .insert([{ nama: nama.value, pesan: pesan.value }]);
  if (!error) {
    nama.value = "";
    pesan.value = "";
    loadUcapan();
  }
};

onMounted(() => {
  loadUcapan();
});
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Lato:300italic);

body {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  /* color-scheme: light dark; */
  /* color: rgba(255, 255, 255, 0.87); */
  /* background-color: #242424; */

  /* height: 100%; */
  min-height: 100vh;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  scrollbar-width: none;
  overflow-x: hidden;
  overflow-y: auto;
}

.input {
  display: block;
  margin: 0.5rem 0;
  padding: 0.5rem;
  width: 50%;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  background: #242424;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: #585858;
}
</style>
