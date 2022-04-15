// Select the toggle button
const btn = document.querySelector('.btn-toggle-drk');
// get theme from localStorage
const currentTheme = localStorage.getItem('Theme');
// Check if theme is darkmode in storage
if (currentTheme === 'dark') {
  //add .dark-theme class to body
  document.body.classList.add('dark-mode');
}
// Listen for toggle button to be used 
btn.addEventListener('click', function () {
//Toggle the .dark-mode class on each click
  document.body.classList.toggle('dark-mode');
//defult set theme to light
  let theme = 'light';
//checks if dark-mode class ha been added
  if (document.body.classList.contains('dark-mode')) {
      //sets them to dark
    theme = 'dark';
  }
  //saves to localstorage
  localStorage.setItem('Theme', theme);
});
