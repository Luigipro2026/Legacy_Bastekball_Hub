(() => {
    // Clave temporal para recordar a qué página debe volver la persona tras iniciar sesión.
    const returnStorageKey = 'basketReturnTo';
    const loginLink = document.getElementById('loginBtn');
    const accountCarouselImage = document.querySelector('.account-visual img');

    // La imagen de la página de cuenta cambia automáticamente; solo se activa si el elemento existe.
    if (accountCarouselImage) {
        const backgroundSlides = [
            '../Static/Imagenes de fondo/Anthony Edwards 1.jpg',
            '../Static/Imagenes de fondo/Damian Lillard 1.jpg',
            '../Static/Imagenes de fondo/Devin Booker 1.jpg',
            '../Static/Imagenes de fondo/Giannis Antetokounmpo 1.jpg',
            '../Static/Imagenes de fondo/Ja Morant 1.jpg',
            '../Static/Imagenes de fondo/James Harden 1.jpg',
            '../Static/Imagenes de fondo/Jayson Tatum 1.jpg',
            '../Static/Imagenes de fondo/Jimmy Butler 1.jpg',
            '../Static/Imagenes de fondo/Joel Embiid 1.jpg',
            '../Static/Imagenes de fondo/Kawhi Leonard 1.jpg',
            '../Static/Imagenes de fondo/Kevin Durant 1.jpg',
            '../Static/Imagenes de fondo/Kobe Bryant 1.jpg',
            '../Static/Imagenes de fondo/Kyrie Irving 1.jpg',
            '../Static/Imagenes de fondo/LeBron James 1.jpg',
            '../Static/Imagenes de fondo/Luka%20Don%C4%8Di%C4%87%201.jpg',
            '../Static/Imagenes de fondo/Michael Jordan 1.jpg',
            '../Static/Imagenes de fondo/Nikola%20Joki%C4%87%201.jpg',
            '../Static/Imagenes de fondo/Russell Westbrook 1.jpg',
            '../Static/Imagenes de fondo/Steph Curry 1.jpg',
            '../Static/Imagenes de fondo/Victor Wembanyama 1.jpg'
        ];
        let backgroundIndex = 0;

        function showNextBackgroundSlide() {
            // Precarga la siguiente imagen y cambia el src solo cuando ya terminó de cargar.
            const nextIndex = (backgroundIndex + 1) % backgroundSlides.length;
            const nextImage = new Image();
            nextImage.onload = () => {
                accountCarouselImage.style.opacity = '0';
                window.setTimeout(() => {
                    accountCarouselImage.src = nextImage.src;
                    accountCarouselImage.style.opacity = '1';
                    backgroundIndex = nextIndex;
                }, 300);
            };
            nextImage.src = backgroundSlides[nextIndex];
        }

        accountCarouselImage.src = backgroundSlides[backgroundIndex];
        window.setInterval(showNextBackgroundSlide, 3500);
    }

    // Guarda la página de origen antes de entrar al formulario de sesión.
    if (loginLink) {
        loginLink.addEventListener('click', () => {
            sessionStorage.setItem(returnStorageKey, window.location.href);
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    const registerForm = document.getElementById('registerForm');
    const activeAccount = document.getElementById('activeAccount');
    const accountForms = document.getElementById('accountForms');
    const accountTitle = document.getElementById('accountTitle');
    const accountSubtitle = document.getElementById('accountSubtitle');
    const accountMessage = document.getElementById('accountMessage');
    const activeName = document.getElementById('activeName');
    const activeEmail = document.getElementById('activeEmail');
    const continueLink = document.getElementById('continueLink');
    const logoutButton = document.getElementById('logoutButton');
    const tabs = [...document.querySelectorAll('[data-auth-mode]')];

    // Lee datos guardados como JSON y usa un valor alternativo si faltan o están dañados.
    function readJson(key, fallback) {
        try {
            const value = JSON.parse(localStorage.getItem(key));
            return value ?? fallback;
        } catch {
            return fallback;
        }
    }

    // Solo permite regresar a una página del mismo sitio y evita volver al propio formulario.
    function getReturnUrl() {
        const savedUrl = sessionStorage.getItem(returnStorageKey);
        if (!savedUrl) return 'Baloncesto tienda.html';
        try {
            const url = new URL(savedUrl, window.location.href);
            if (url.protocol !== window.location.protocol || url.host !== window.location.host || url.pathname.endsWith('/sesion.html')) {
                return 'Baloncesto tienda.html';
            }
            return url.href;
        } catch {
            return 'Baloncesto tienda.html';
        }
    }

    // Presenta mensajes accesibles y les asigna un estilo según sean error o confirmación.
    function showMessage(message, type = 'error') {
        accountMessage.textContent = message;
        accountMessage.className = `account-message is-${type}`;
        accountMessage.hidden = false;
    }

    function clearMessage() {
        accountMessage.textContent = '';
        accountMessage.hidden = true;
        accountMessage.className = 'account-message';
    }

    // Sincroniza formulario, títulos y pestaña seleccionada con el modo login/registro.
    function setMode(mode) {
        const registering = mode === 'register';
        loginForm.hidden = registering;
        registerForm.hidden = !registering;
        accountTitle.textContent = registering ? 'Crea tu cuenta' : 'Bienvenido de vuelta';
        accountSubtitle.textContent = registering
            ? 'Guarda tus datos y sigue cada temporada con Legacy.'
            : 'Inicia sesión para continuar con tu compra.';
        tabs.forEach((tab) => {
            const active = tab.dataset.authMode === mode;
            tab.classList.toggle('is-active', active);
            tab.setAttribute('aria-selected', String(active));
        });
        clearMessage();
    }

    // Cambia de los formularios a la vista de cuenta activa después de autenticar.
    function showActiveAccount(user) {
        activeName.textContent = user.name || 'jugador';
        activeEmail.textContent = user.email;
        continueLink.href = getReturnUrl();
        activeAccount.hidden = false;
        accountForms.hidden = true;
    }

    function showAccountForms() {
        activeAccount.hidden = true;
        accountForms.hidden = false;
    }

    // Convierte bytes a hexadecimal para guardar salt y hash en una cadena.
    function bytesToHex(bytes) {
        return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
    }

    function createSalt() {
        return bytesToHex(window.crypto.getRandomValues(new Uint8Array(16)));
    }

    // Deriva un hash PBKDF2 con salt aleatorio para no guardar la contraseña en texto plano.
    async function hashPassword(password, salt) {
        const saltBytes = Uint8Array.from(salt.match(/.{2}/g), (byte) => parseInt(byte, 16));
        const key = await window.crypto.subtle.importKey(
            'raw',
            new TextEncoder().encode(password),
            'PBKDF2',
            false,
            ['deriveBits']
        );
        const result = await window.crypto.subtle.deriveBits({
            name: 'PBKDF2',
            salt: saltBytes,
            iterations: 120000,
            hash: 'SHA-256'
        }, key, 256);
        return bytesToHex(new Uint8Array(result));
    }

    function storeActiveUser(user) {
        // La sesión activa solo conserva nombre y correo; las credenciales quedan en la lista de cuentas.
        localStorage.setItem('basketUser', JSON.stringify({ name: user.name, email: user.email }));
        showActiveAccount(user);
    }

    // Cada pestaña selecciona el formulario correspondiente.
    tabs.forEach((tab) => tab.addEventListener('click', () => setMode(tab.dataset.authMode)));

    // Inicio de sesión: busca el correo, vuelve a calcular el hash y compara con el almacenado.
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearMessage();
        const email = document.getElementById('loginEmail').value.trim().toLowerCase();
        const password = document.getElementById('loginPassword').value;
        const accounts = readJson('basketAccounts', []);
        const account = accounts.find((item) => item.email === email);
        if (!account) {
            showMessage('No encontramos esa cuenta. Revisa tus datos o crea una cuenta.');
            return;
        }
        try {
            const passwordHash = await hashPassword(password, account.passwordSalt);
            if (passwordHash !== account.passwordHash) {
                showMessage('El correo o la contraseña no coinciden.');
                return;
            }
            storeActiveUser(account);
        } catch {
            showMessage('No se pudo verificar la contraseña en este navegador.');
        }
    });

    // Registro: valida confirmación y correo único antes de crear y guardar la cuenta.
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        clearMessage();
        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim().toLowerCase();
        const password = document.getElementById('registerPassword').value;
        const confirmation = document.getElementById('registerPasswordConfirm').value;
        if (password !== confirmation) {
            showMessage('Las contraseñas no coinciden.');
            return;
        }

        const accounts = readJson('basketAccounts', []);
        if (accounts.some((item) => item.email === email)) {
            showMessage('Ya existe una cuenta con ese correo.');
            return;
        }

        try {
            const passwordSalt = createSalt();
            const passwordHash = await hashPassword(password, passwordSalt);
            const account = { name, email, passwordSalt, passwordHash };
            accounts.push(account);
            localStorage.setItem('basketAccounts', JSON.stringify(accounts));
            storeActiveUser(account);
        } catch {
            showMessage('No se pudo crear la cuenta en este navegador.');
        }
    });

    // Cerrar sesión elimina solo el usuario activo; la cuenta registrada permanece guardada.
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('basketUser');
        showAccountForms();
        setMode('login');
        showMessage('Sesión cerrada.', 'success');
    });

    // Al abrir la página, restaura la vista de cuenta si hay una sesión válida guardada.
    const currentUser = readJson('basketUser', null);
    if (currentUser?.email) {
        showActiveAccount(currentUser);
    }
})();