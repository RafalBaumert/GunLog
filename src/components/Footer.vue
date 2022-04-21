<template>
  <footer>
    <div class="footer-content">
      <div class="footer-lang">
        <ul>
          <li>Polski</li>
          <li>English</li>
        </ul>
      </div>
      <div class="footer-options">
        <ul>
          <li>Zaloguj się</li>
          <li>Zarejestruj się</li>
          <li>Twórcy aplikcji</li>
          <li>Prywatność</li>
          <li>Regulamin</li>
          <li>Pomoc</li>
        </ul>
      </div>
      <div class="footer-c">
        Rafał Baumert, Iwo Krusz. &copy; Prawa autorskie zastrzeżone.
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* footer {
  width: 100%;
  height: 100%;
  background: #1f2d40;
} */

footer {
  width: 100%;
  height: 100%;
  background-color: #1f2d40;
  color: #a5abb3;
  font-size: 0.8rem;
}

.footer-content {
  margin: 3rem auto;
  width: 980px;
}

.footer-lang {
  border-bottom: 1px solid#304562;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
}

.footer-options {
  margin-bottom: 3rem;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

li {
  margin-right: 1rem;
}

li:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
