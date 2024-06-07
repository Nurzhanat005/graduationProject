document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const feedbackData = {
        name: name,
        email: email,
        message: message
    };

    fetch('/api/main', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify(feedbackData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert('Ваш отзыв был отправлен успешно!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке отзыва.');
        });
});


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    function smoothScroll(target) {
        const targetSection = document.querySelector(target);
        window.scrollTo({
            top: targetSection.offsetTop - header.offsetHeight,
            behavior: 'smooth'
        });
    }

    navLinks.forEach((link) => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });

    header.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const target = e.target.getAttribute('href');
            smoothScroll(target);
        }
    });

    function onScroll() {
        const scrollPos = window.scrollY + header.offsetHeight;
        sections.forEach((section) => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === section.id) {
                        link.classList.add('active');
                    }
                });
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll();
});
