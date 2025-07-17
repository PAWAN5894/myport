// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle for mobile with animation
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');

  sidebarToggle.addEventListener('click', () => {
    sidebarToggle.classList.toggle('active');
    if (window.innerWidth < 900) {
      sidebar.classList.toggle('show');
    } else {
      sidebar.classList.toggle('hide');
    }
  });

  document.addEventListener('click', (e) => {
    if (window.innerWidth < 900 && !sidebar.contains(e.target) && e.target !== sidebarToggle) {
      sidebar.classList.remove('show');
      sidebarToggle.classList.remove('active');
    }
  });

  // Typed.js init
  new Typed('.typed', {
    strings: ['Front End Developer', '3D Web Enthusiast', 'Creative Coder'],
    typeSpeed: 85,
    backSpeed: 38,
    backDelay: 1800,
    loop: true
  });

  // GSAP scroll-triggered animations
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('.anim-fade').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 45 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
  });

  // Experience section toggle
  const toggleBtn = document.getElementById('toggleExperienceBtn');
  const detailsBox = document.getElementById('experienceDetails');
  const toggleText = document.getElementById('toggleText');

  toggleBtn.addEventListener('click', () => {
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      detailsBox.setAttribute('aria-hidden', 'true');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleText.textContent = 'Show Details';
    } else {
      detailsBox.setAttribute('aria-hidden', 'false');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleText.textContent = 'Hide Details';
    }
  });

  // Three.js: 3D spinning avatar
  if(window.THREE){
    const canvas = document.getElementById('avatar3d');
    if(canvas){
      const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
      renderer.setSize(70,70);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45,1,0.1,100);
      camera.position.z = 2;

      const geometry = new THREE.SphereGeometry(0.48, 32, 32);
      const material = new THREE.MeshNormalMaterial();
      const sphere = new THREE.Mesh(geometry, material);
      scene.add(sphere);

      function animate() {
        sphere.rotation.x += 0.007;
        sphere.rotation.y += 0.012;
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
      }
      animate();
    }
  }

  // Three.js: Rotating cubes for project cards
  ['cube1','cube2'].forEach((id,index) => {
    const canvas = document.getElementById(id);
    if(window.THREE && canvas){
      const renderer = new THREE.WebGLRenderer({canvas, alpha:true, antialias:true});
      renderer.setSize(64, 64);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60,1,0.1,100);
      camera.position.z = 2.5;

      const colors = [0x149ddd, 0x13b0fd, 0xe70faa, 0xffffff];
      const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const material = new THREE.MeshToonMaterial({ color: colors[index % colors.length] });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      function animate() {
        cube.rotation.x += 0.013 + index * 0.003;
        cube.rotation.y += 0.017 + index * 0.004;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      animate();
    }
  });

  // VANTA.NET Animated Background
  if(typeof VANTA !== 'undefined'){
    VANTA.NET({
      el: "#vanta-bg",
      color: 0x13b0fd,
      backgroundColor: 0x121b30,
      points: 14.0,
      maxDistance: 23.0,
      spacing: 22.0,
      showDots: true,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');

  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show');
  });

  // Close sidebar when clicking outside it on mobile
  document.addEventListener('click', (event) => {
    if (
      window.innerWidth <= 900 &&
      sidebar.classList.contains('show') &&
      !sidebar.contains(event.target) &&
      event.target !== sidebarToggle
    ) {
      sidebar.classList.remove('show');
    }
  });

  // Optional: Close sidebar on window resize over mobile threshold
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && sidebar.classList.contains('show')) {
      sidebar.classList.remove('show');
    }
  });
});
