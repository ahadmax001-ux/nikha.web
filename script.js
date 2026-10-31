/**
 * PREMIUM WEDDING INVITATION WEBSITE JAVASCRIPT
 * COUPLE: SHARIK ZAFAR SIDDIQUI & ZAINAB PARWEEN
 * EVENT: BARAAT CEREMONY — 12 NOVEMBER 2026, 8:00 PM IST
 * CREATED WITH LOVE BY: MOHAMMAD ALAMIN HUSSAIN
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. CONSTANTS & DETAILS
  // =========================================================================
  const WEDDING_CONFIG = {
    bride: 'Zainab parween',
    groom: 'Sharik Zafar Siddiqui',
    event: 'Baraat Ceremony',
    dateText: '12 November 2026',
    dayText: 'Thursday',
    timeText: '8:00 PM IST',
    venue: 'Mohalla Khalifa Tola, Near Madarsa Darul Uloom Faridia, Roh, Nawada, Bihar, India.',
    shortVenue: 'Khalifa Tola, Roh, Nawada, Bihar.',
    whatsappNumber: '917061203970',
    // Target ISO timestamp: 12 Nov 2026 at 20:00:00 IST (+05:30)
    targetTimestamp: new Date('2026-11-12T20:00:00+05:30').getTime()
  };

  // Shared Audio Elements & State
  const weddingMusic = document.getElementById('weddingMusic');
  const musicToggleBtn = document.getElementById('musicToggleBtn');
  let isMusicPlaying = false;

  function updateMusicUI(playing) {
    if (!musicToggleBtn) return;
    const bubbleIcon = musicToggleBtn.querySelector('.bubble-icon');
    const bubbleTooltip = musicToggleBtn.querySelector('.bubble-tooltip');

    if (playing) {
      if (bubbleIcon) bubbleIcon.textContent = '🔊';
      if (bubbleTooltip) bubbleTooltip.textContent = 'Pause Music';
      musicToggleBtn.classList.add('playing');
    } else {
      if (bubbleIcon) bubbleIcon.textContent = '🎵';
      if (bubbleTooltip) bubbleTooltip.textContent = 'Play Music';
      musicToggleBtn.classList.remove('playing');
    }
  }

  // =========================================================================
  // 1.5. INTERACTIVE WEDDING INVITATION OPENING EXPERIENCE (ENVELOPE 3D)
  // =========================================================================
  const openingOverlay = document.getElementById('invitationOpeningOverlay');
  const openInvitationBtn = document.getElementById('openInvitationBtn');
  const envelopeScene = document.querySelector('.envelope-scene');
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const waxSeal = document.getElementById('waxSeal');
  const skipOpeningBtn = document.getElementById('skipOpeningBtn');
  const reopenEnvelopeBtn = document.getElementById('reopenEnvelopeBtn');
  const openingSparklesCanvas = document.getElementById('openingSparklesCanvas');

  let isEnvelopeOpened = false;
  let sparklesAnimFrame = null;
  const burstParticles = [];

  // Lock body scroll on initial load while invitation overlay is displayed
  if (openingOverlay) {
    document.body.classList.add('invitation-overlay-active');
  }

  // Interactive 3D tilt & specular gold highlight tracking on envelope scene
  if (envelopeScene && envelopeWrapper && window.matchMedia('(pointer: fine)').matches) {
    envelopeScene.addEventListener('mousemove', (e) => {
      if (isEnvelopeOpened) return;
      const rect = envelopeWrapper.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      const clampedX = Math.max(-1, Math.min(1, x));
      const clampedY = Math.max(-1, Math.min(1, y));

      envelopeWrapper.style.transform = `translateY(-6px) rotateY(${clampedX * 7}deg) rotateX(${-clampedY * 7}deg)`;
      envelopeWrapper.style.setProperty('--seal-sheen-x', `${35 + clampedX * 28}%`);
      envelopeWrapper.style.setProperty('--seal-sheen-y', `${35 + clampedY * 28}%`);
    });

    envelopeScene.addEventListener('mouseleave', () => {
      if (isEnvelopeOpened) return;
      envelopeWrapper.style.transform = '';
      envelopeWrapper.style.removeProperty('--seal-sheen-x');
      envelopeWrapper.style.removeProperty('--seal-sheen-y');
    });
  }

  // Golden stardust spark burst from wax seal upon breaking
  function spawnSealBurst() {
    if (!openingSparklesCanvas || !waxSeal) return;
    const rect = waxSeal.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const BURST_COUNT = 48;
    for (let i = 0; i < BURST_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2.2 + Math.random() * 6.5;
      burstParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (1 + Math.random() * 2), // upward bias
        radius: 1.2 + Math.random() * 2.8,
        alpha: 1,
        decay: 0.014 + Math.random() * 0.02,
        gravity: 0.12,
        friction: 0.95,
        color: Math.random() > 0.4 ? '#FFF3BE' : '#D4AF37'
      });
    }
  }

  function triggerCoupleNameShimmer() {
    const coupleNames = document.querySelector('.couple-first-names');
    if (coupleNames) {
      coupleNames.classList.add('shimmer-active');
      setTimeout(() => coupleNames.classList.remove('shimmer-active'), 2500);
    }
  }

  function openEnvelopeSequence() {
    if (isEnvelopeOpened || !openingOverlay) return;
    isEnvelopeOpened = true;

    // Trigger visual opening & spectacular gold particle burst
    openingOverlay.classList.add('is-opening');
    spawnSealBurst();

    // Reset inline tilt styles
    if (envelopeWrapper) {
      envelopeWrapper.style.transform = '';
    }

    // On user gesture, start the romantic background music if paused
    if (weddingMusic && weddingMusic.paused) {
      weddingMusic.play().then(() => {
        isMusicPlaying = true;
        updateMusicUI(true);
      }).catch((e) => {
        console.log('Audio autoplay note:', e);
      });
    }

    // Transition smoothly into website with cinematic golden fade
    setTimeout(() => {
      openingOverlay.classList.add('is-exiting');
      document.body.classList.remove('invitation-overlay-active');

      // Trigger celebratory gold foil shimmer across couple names on hero card
      triggerCoupleNameShimmer();

      setTimeout(() => {
        openingOverlay.classList.add('is-hidden');
      }, 850);
    }, 2400);
  }

  function fastSkipOpening() {
    if (!openingOverlay) return;
    isEnvelopeOpened = true;
    openingOverlay.classList.add('is-exiting');
    document.body.classList.remove('invitation-overlay-active');
    triggerCoupleNameShimmer();
    setTimeout(() => {
      openingOverlay.classList.add('is-hidden');
    }, 600);
  }

  function reopenEnvelope() {
    if (!openingOverlay) return;
    isEnvelopeOpened = false;
    burstParticles.length = 0;
    openingOverlay.classList.remove('is-hidden', 'is-exiting', 'is-opening');
    document.body.classList.add('invitation-overlay-active');
    window.scrollTo({ top: 0, behavior: 'instant' });
    startSparklesAnimation();
  }

  if (openInvitationBtn) openInvitationBtn.addEventListener('click', openEnvelopeSequence);
  if (envelopeWrapper) envelopeWrapper.addEventListener('click', openEnvelopeSequence);
  if (waxSeal) waxSeal.addEventListener('click', (e) => { e.stopPropagation(); openEnvelopeSequence(); });
  if (skipOpeningBtn) skipOpeningBtn.addEventListener('click', fastSkipOpening);
  if (reopenEnvelopeBtn) reopenEnvelopeBtn.addEventListener('click', reopenEnvelope);

  // Keyboard accessibility
  if (envelopeWrapper) {
    envelopeWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelopeSequence();
      }
    });
  }

  // Golden stardust particle & burst canvas on opening screen
  let startSparklesAnimation = () => {};
  if (openingSparklesCanvas && openingOverlay) {
    const sCtx = openingSparklesCanvas.getContext('2d');
    let sW = openingSparklesCanvas.width = window.innerWidth;
    let sH = openingSparklesCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      if (!openingOverlay.classList.contains('is-hidden')) {
        sW = openingSparklesCanvas.width = window.innerWidth;
        sH = openingSparklesCanvas.height = window.innerHeight;
      }
    }, { passive: true });

    const sparkles = [];
    const SPARKLE_COUNT = 38;
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      sparkles.push({
        x: Math.random() * sW,
        y: Math.random() * sH,
        radius: 0.9 + Math.random() * 2.2,
        speedY: -(0.2 + Math.random() * 0.45),
        speedX: (Math.random() - 0.5) * 0.25,
        alpha: Math.random(),
        alphaSpeed: 0.01 + Math.random() * 0.018
      });
    }

    function animateSparkles() {
      if (openingOverlay.classList.contains('is-hidden')) {
        sparklesAnimFrame = null;
        return;
      }
      sCtx.clearRect(0, 0, sW, sH);

      // Render ambient ambient floating sparkles
      sparkles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha += p.alphaSpeed;
        if (p.alpha > 1 || p.alpha < 0.2) p.alphaSpeed = -p.alphaSpeed;

        if (p.y < -10) {
          p.y = sH + 10;
          p.x = Math.random() * sW;
        }

        sCtx.save();
        sCtx.beginPath();
        sCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        sCtx.fillStyle = `rgba(212, 175, 55, ${Math.max(0, Math.min(1, p.alpha * 0.55))})`;
        sCtx.shadowBlur = 6;
        sCtx.shadowColor = '#D4AF37';
        sCtx.fill();
        sCtx.restore();
      });

      // Render seal break burst sparks
      for (let i = burstParticles.length - 1; i >= 0; i--) {
        const bp = burstParticles[i];
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.vy += bp.gravity;
        bp.vx *= bp.friction;
        bp.vy *= bp.friction;
        bp.alpha -= bp.decay;

        if (bp.alpha <= 0) {
          burstParticles.splice(i, 1);
          continue;
        }

        sCtx.save();
        sCtx.beginPath();
        sCtx.arc(bp.x, bp.y, bp.radius, 0, Math.PI * 2);
        sCtx.fillStyle = bp.color;
        sCtx.globalAlpha = Math.max(0, bp.alpha);
        sCtx.shadowBlur = 10;
        sCtx.shadowColor = '#FFE894';
        sCtx.fill();
        sCtx.restore();
      }

      sparklesAnimFrame = requestAnimationFrame(animateSparkles);
    }

    startSparklesAnimation = function() {
      if (!sparklesAnimFrame) {
        sparklesAnimFrame = requestAnimationFrame(animateSparkles);
      }
    };

    startSparklesAnimation();
  }

  // =========================================================================
  // 2. LIVE WEDDING COUNTDOWN TIMER
  // =========================================================================
  const countDaysEl = document.getElementById('countDays');
  const countHoursEl = document.getElementById('countHours');
  const countMinutesEl = document.getElementById('countMinutes');
  const countSecondsEl = document.getElementById('countSeconds');
  const countdownGridEl = document.getElementById('countdownGrid');
  const celebrationMessageEl = document.getElementById('celebrationMessage');

  function updateCountdown() {
    const now = Date.now();
    const distance = WEDDING_CONFIG.targetTimestamp - now;

    if (distance <= 0) {
      // The event has arrived or passed
      if (countDaysEl) countDaysEl.textContent = '00';
      if (countHoursEl) countHoursEl.textContent = '00';
      if (countMinutesEl) countMinutesEl.textContent = '00';
      if (countSecondsEl) countSecondsEl.textContent = '00';

      if (countdownGridEl) countdownGridEl.classList.add('hidden');
      if (celebrationMessageEl) celebrationMessageEl.classList.remove('hidden');
      return;
    }

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Format with leading zeroes
    if (countDaysEl) countDaysEl.textContent = days < 10 ? `0${days}` : String(days);
    if (countHoursEl) countHoursEl.textContent = hours < 10 ? `0${hours}` : String(hours);
    if (countMinutesEl) countMinutesEl.textContent = minutes < 10 ? `0${minutes}` : String(minutes);
    if (countSecondsEl) countSecondsEl.textContent = seconds < 10 ? `0${seconds}` : String(seconds);
  }

  // Initial call and start interval
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // =========================================================================
  // 3. NAVIGATION & SCROLL INTERACTIONS
  // =========================================================================
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const scrollUpBtn = document.getElementById('scrollUpBtn');

  // Sticky header shadow on scroll & Back to top button visibility
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (scrollUpBtn) {
      if (scrollY > 400) {
        scrollUpBtn.classList.remove('hidden');
      } else {
        scrollUpBtn.classList.add('hidden');
      }
    }
  }, { passive: true });

  if (scrollUpBtn) {
    scrollUpBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu on clicking any navigation link
    const navLinks = navMenu.querySelectorAll('.nav-link, .btn');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll for all internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#' && !targetId.includes('Modal')) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // =========================================================================
  // 4. VENUE ACTIONS: COPY ADDRESS & ADD TO CALENDAR
  // =========================================================================
  const copyAddressBtn = document.getElementById('copyAddressBtn');
  if (copyAddressBtn) {
    copyAddressBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(WEDDING_CONFIG.venue);
        showToast('Venue address copied to clipboard! 📋');
      } catch (err) {
        // Fallback for older browsers
        const tempInput = document.createElement('textarea');
        tempInput.value = WEDDING_CONFIG.venue;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Venue address copied to clipboard! 📋');
      }
    });
  }

  const addToCalendarBtn = document.getElementById('addToCalendarBtn');
  if (addToCalendarBtn) {
    addToCalendarBtn.addEventListener('click', () => {
      // 12 Nov 2026, 8:00 PM IST is 2026-11-12 14:30:00 UTC
      // Duration ~3.5 hours: ends 23:30 IST / 18:00 UTC
      const title = encodeURIComponent(`Wedding Baraat: Sharik & Zainab`);
      const details = encodeURIComponent(`Baraat Ceremony of Sharik Zafar Siddiqui & Zainab Parween.\nVenue: ${WEDDING_CONFIG.venue}`);
      const location = encodeURIComponent(WEDDING_CONFIG.venue);
      // Google Calendar event URL format (UTC dates: YYYYMMDDTHHmmSSZ)
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261112T143000Z/20261112T180000Z&details=${details}&location=${location}`;
      window.open(gcalUrl, '_blank', 'noopener,noreferrer');
      showToast('Opening Google Calendar... 📅');
    });
  }

  // =========================================================================
  // 5. RSVP FORM WITH WHATSAPP INTEGRATION
  // =========================================================================
  const rsvpForm = document.getElementById('rsvpForm');
  const guestNameInput = document.getElementById('guestName');
  const guestCountSelect = document.getElementById('guestCount');
  const guestCountGroup = document.getElementById('guestCountGroup');
  const guestCountHint = document.getElementById('guestCountHint');
  const familyQuestionInput = document.getElementById('familyQuestion');
  const coupleMessageInput = document.getElementById('coupleMessage');
  const nameError = document.getElementById('nameError');
  const attendanceError = document.getElementById('attendanceError');
  const rsvpModal = document.getElementById('rsvpModal');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  let pendingWhatsAppUrl = '';

  // Dynamic feedback when attendance selection changes
  if (rsvpForm) {
    const attendanceRadios = rsvpForm.querySelectorAll('input[name="attendance"]');
    attendanceRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'Unable to Attend') {
          if (guestCountGroup) {
            guestCountGroup.classList.add('is-muted');
          }
          if (guestCountHint) {
            guestCountHint.textContent = 'Guest count not applicable as you are unable to attend.';
          }
        } else {
          if (guestCountGroup) {
            guestCountGroup.classList.remove('is-muted');
          }
          if (guestCountHint) {
            guestCountHint.textContent = 'Including yourself and attending family members.';
          }
        }
      });
    });

    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous error messages
      if (nameError) nameError.textContent = '';
      if (attendanceError) attendanceError.textContent = '';
      if (guestNameInput) guestNameInput.classList.remove('is-invalid');

      let isValid = true;

      // Validate Guest Full Name
      const guestName = guestNameInput ? guestNameInput.value.trim() : '';
      if (!guestName) {
        if (nameError) nameError.textContent = 'Please enter your full name.';
        if (guestNameInput) {
          guestNameInput.classList.add('is-invalid');
          guestNameInput.focus();
        }
        isValid = false;
      }

      // Validate Attendance Radio Selection
      const attendanceRadio = rsvpForm.querySelector('input[name="attendance"]:checked');
      if (!attendanceRadio) {
        if (attendanceError) attendanceError.textContent = 'Please select your attendance status.';
        isValid = false;
      }

      if (!isValid) return;

      const attendanceValue = attendanceRadio ? attendanceRadio.value : 'Will Attend';
      const guestCountValue = (attendanceValue === 'Unable to Attend') 
        ? 'N/A (Unable to Attend)' 
        : (guestCountSelect ? guestCountSelect.value : '1');
      const familyQuestionValue = (familyQuestionInput && familyQuestionInput.value.trim()) 
        ? familyQuestionInput.value.trim() 
        : '';
      const coupleMessageValue = (coupleMessageInput && coupleMessageInput.value.trim()) 
        ? coupleMessageInput.value.trim() 
        : 'None';

      // Format WhatsApp Message with couple details, attendance, guest count, and message
      let messageText = 
`Wedding RSVP
Couple: ${WEDDING_CONFIG.groom} & ${WEDDING_CONFIG.bride}

Guest Name: ${guestName}
Attendance: ${attendanceValue}
Number of Guests: ${guestCountValue}`;

      if (familyQuestionValue) {
        messageText += `\nQuestion for Family: ${familyQuestionValue}`;
      }

      messageText += 
`\nMessage for Couple: ${coupleMessageValue}

Wedding Date: ${WEDDING_CONFIG.dateText}
Wedding Time: ${WEDDING_CONFIG.timeText}
Venue: ${WEDDING_CONFIG.shortVenue}`;

      // URL encode and build wa.me link
      pendingWhatsAppUrl = `https://wa.me/${WEDDING_CONFIG.whatsappNumber}?text=${encodeURIComponent(messageText)}`;

      // Show confirmation guidance modal to remind guest to press Send inside WhatsApp
      if (rsvpModal) {
        rsvpModal.classList.remove('hidden');
      } else {
        // Fallback: open directly
        window.open(pendingWhatsAppUrl, '_blank', 'noopener,noreferrer');
        showToast('Opening WhatsApp... Please tap Send to submit your RSVP! 💬');
      }
    });
  }

  if (modalConfirmBtn) {
    modalConfirmBtn.addEventListener('click', () => {
      if (pendingWhatsAppUrl) {
        window.open(pendingWhatsAppUrl, '_blank', 'noopener,noreferrer');
        showToast('Opening WhatsApp... Please remember to tap Send! 💬');
      }
      if (rsvpModal) rsvpModal.classList.add('hidden');
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      if (rsvpModal) rsvpModal.classList.add('hidden');
    });
  }

  // Dismiss modal on backdrop click
  if (rsvpModal) {
    const backdrop = rsvpModal.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => {
        rsvpModal.classList.add('hidden');
      });
    }
  }

  // =========================================================================
  // 6. GALLERY LIGHTBOX MODAL
  // =========================================================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const galleryLightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  function openLightbox(src, caption) {
    if (!galleryLightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = caption || 'Wedding Moment';
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    galleryLightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!galleryLightbox) return;
    galleryLightbox.classList.add('hidden');
    if (lightboxImg) lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      const caption = item.getAttribute('data-caption');
      if (src) openLightbox(src, caption);
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const src = item.getAttribute('data-src');
        const caption = item.getAttribute('data-caption');
        if (src) openLightbox(src, caption);
      }
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (galleryLightbox) {
    const backdrop = galleryLightbox.querySelector('.lightbox-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeLightbox);
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      if (rsvpModal) rsvpModal.classList.add('hidden');
      const guideModal = document.getElementById('guideModal');
      if (guideModal) guideModal.classList.add('hidden');
    }
  });

  // Guide Modal trigger
  const viewGuideLink = document.getElementById('viewGuideLink');
  const guideModal = document.getElementById('guideModal');
  const guideCloseBtn = document.getElementById('guideCloseBtn');

  if (viewGuideLink && guideModal) {
    viewGuideLink.addEventListener('click', (e) => {
      e.preventDefault();
      guideModal.classList.remove('hidden');
    });
  }

  if (guideCloseBtn && guideModal) {
    guideCloseBtn.addEventListener('click', () => {
      guideModal.classList.add('hidden');
    });
    const backdrop = guideModal.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => guideModal.classList.add('hidden'));
    }
  }

  // =========================================================================
  // 7. PREVIEW YOUR PHOTOS (LOCAL PHOTO PREVIEW FEATURE)
  // =========================================================================
  const photoFileInput = document.getElementById('photoFileInput');
  const uploadDropzone = document.getElementById('uploadDropzone');
  const browsePhotosBtn = document.getElementById('browsePhotosBtn');
  const userPreviewGrid = document.getElementById('userPreviewGrid');
  const previewHeaderBar = document.getElementById('previewHeaderBar');
  const previewCount = document.getElementById('previewCount');
  const clearAllPreviewsBtn = document.getElementById('clearAllPreviewsBtn');
  const previewStatusMsg = document.getElementById('previewStatusMsg');

  const MAX_PREVIEW_IMAGES = 8;
  let selectedFiles = []; // Array of { name, size, dataUrl }

  if (browsePhotosBtn && photoFileInput) {
    browsePhotosBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      photoFileInput.click();
    });
  }

  if (uploadDropzone && photoFileInput) {
    uploadDropzone.addEventListener('click', () => {
      photoFileInput.click();
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      uploadDropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadDropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      uploadDropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadDropzone.classList.remove('dragover');
      });
    });

    uploadDropzone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files.length) {
        handleFileSelection(Array.from(dt.files));
      }
    });

    photoFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length) {
        handleFileSelection(Array.from(e.target.files));
      }
    });
  }

  function handleFileSelection(files) {
    if (previewStatusMsg) previewStatusMsg.textContent = '';

    const validImageFiles = files.filter(file => file.type.startsWith('image/'));

    if (validImageFiles.length === 0) {
      if (previewStatusMsg) {
        previewStatusMsg.textContent = 'Please choose valid image files (JPG, PNG, WEBP, or GIF).';
      }
      return;
    }

    const availableSlots = MAX_PREVIEW_IMAGES - selectedFiles.length;
    if (availableSlots <= 0) {
      if (previewStatusMsg) {
        previewStatusMsg.textContent = `You have already selected the maximum of ${MAX_PREVIEW_IMAGES} photos. Remove some to add others.`;
      }
      return;
    }

    const filesToLoad = validImageFiles.slice(0, availableSlots);
    if (validImageFiles.length > availableSlots && previewStatusMsg) {
      previewStatusMsg.textContent = `Only the first ${availableSlots} photos were added to stay within the limit of ${MAX_PREVIEW_IMAGES}.`;
    }

    filesToLoad.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        selectedFiles.push({
          name: file.name,
          size: formatFileSize(file.size),
          dataUrl: event.target.result
        });
        renderPreviewGrid();
      };
      reader.readAsDataURL(file);
    });
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function renderPreviewGrid() {
    if (!userPreviewGrid) return;
    userPreviewGrid.innerHTML = '';

    if (selectedFiles.length === 0) {
      if (previewHeaderBar) previewHeaderBar.classList.add('hidden');
      return;
    }

    if (previewHeaderBar) previewHeaderBar.classList.remove('hidden');
    if (previewCount) {
      previewCount.textContent = `${selectedFiles.length} of ${MAX_PREVIEW_IMAGES} photos previewed`;
    }

    selectedFiles.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'preview-thumb-card';

      const img = document.createElement('img');
      img.src = item.dataUrl;
      img.alt = item.name;
      img.className = 'preview-thumb-img';

      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-thumb-btn';
      removeBtn.innerHTML = '✕';
      removeBtn.title = 'Remove photo';
      removeBtn.setAttribute('aria-label', `Remove photo ${item.name}`);
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedFiles.splice(index, 1);
        renderPreviewGrid();
      });

      const meta = document.createElement('div');
      meta.className = 'preview-thumb-meta';
      meta.textContent = `${item.name} (${item.size})`;

      card.appendChild(img);
      card.appendChild(removeBtn);
      card.appendChild(meta);

      // Lightbox click on preview thumbnail
      card.addEventListener('click', () => {
        openLightbox(item.dataUrl, `Local Preview: ${item.name}`);
      });

      userPreviewGrid.appendChild(card);
    });
  }

  if (clearAllPreviewsBtn) {
    clearAllPreviewsBtn.addEventListener('click', () => {
      selectedFiles = [];
      if (photoFileInput) photoFileInput.value = '';
      if (previewStatusMsg) previewStatusMsg.textContent = '';
      renderPreviewGrid();
      showToast('Photo previews cleared.');
    });
  }

  // =========================================================================
  // 8. ROMANTIC MUSIC PLAYER (music/song.mp4)
  // =========================================================================
  if (weddingMusic) {
    weddingMusic.volume = 0.55;

    // Synchronize UI state with native audio element events
    weddingMusic.addEventListener('play', () => {
      isMusicPlaying = true;
      updateMusicUI(true);
    });

    weddingMusic.addEventListener('pause', () => {
      isMusicPlaying = false;
      updateMusicUI(false);
    });

    weddingMusic.addEventListener('ended', () => {
      isMusicPlaying = false;
      updateMusicUI(false);
    });

    weddingMusic.addEventListener('error', (err) => {
      console.warn('Audio playback error or format issue:', err);
      isMusicPlaying = false;
      updateMusicUI(false);
      showToast('Audio file could not be loaded. Please check music/song.mp4 🎵');
    });
  }

  function toggleMusic() {
    if (!weddingMusic || !musicToggleBtn) return;

    if (weddingMusic.paused) {
      // User requested play
      const playPromise = weddingMusic.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isMusicPlaying = true;
            updateMusicUI(true);
            showToast('Playing wedding music 🎶');
          })
          .catch((error) => {
            console.error('Error attempting to play audio:', error);
            isMusicPlaying = false;
            updateMusicUI(false);
            showToast('Playback was blocked or file could not play. Tap again! 🎵');
          });
      }
    } else {
      // User requested pause
      weddingMusic.pause();
      isMusicPlaying = false;
      updateMusicUI(false);
      showToast('Music paused ⏸️');
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', toggleMusic);
  }

  // =========================================================================
  // 9. ENHANCED FALLING ROSE PETALS & GOLDEN PARTICLES (CANVAS)
  // =========================================================================
  const canvas = document.getElementById('petalsCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    // Track mouse / touch position for gentle interactive breeze deflection
    let mousePos = { x: -999, y: -999, active: false };
    window.addEventListener('mousemove', (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      mousePos.active = true;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      mousePos.active = false;
    });

    const PETAL_COUNT = 26; // Refined, elegant density
    const petals = [];

    // Authentic rose petals palette & champagne accents
    const petalColors = [
      'rgba(232, 165, 152, 0.52)', // Rose blush
      'rgba(216, 130, 124, 0.48)', // Rose primary
      'rgba(247, 234, 230, 0.62)', // Pale rose
      'rgba(245, 222, 179, 0.42)'  // Champagne stardust
    ];

    class Petal {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.depth = 0.45 + Math.random() * 0.7; // Depth layering factor
        this.size = (8 + Math.random() * 11) * this.depth;
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -25 - Math.random() * 40;
        this.speedY = (0.55 + Math.random() * 0.95) * this.depth;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.rotation = Math.random() * 360;
        this.rotSpeed = (Math.random() - 0.5) * 1.1;

        // 3D tumbling angles (curl and flip)
        this.tilt = Math.random() * Math.PI;
        this.tiltSpeed = 0.012 + Math.random() * 0.022;
        this.flip = Math.random() * Math.PI;
        this.flipSpeed = 0.015 + Math.random() * 0.025;

        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        this.oscillation = Math.random() * 10;
        this.oscSpeed = 0.015 + Math.random() * 0.02;

        // Interactive breeze deflection velocities
        this.vx = 0;
        this.vy = 0;
      }

      update(time, globalWind) {
        // Natural wind response scaled by depth
        this.y += this.speedY + this.vy;
        this.oscillation += this.oscSpeed;
        this.x += this.speedX + Math.sin(this.oscillation) * 0.5 + globalWind * this.depth * 0.6 + this.vx;

        // 3D rotation and tumbling
        this.rotation += this.rotSpeed;
        this.tilt += this.tiltSpeed;
        this.flip += this.flipSpeed;

        // Gentle interactive breeze when cursor is nearby
        if (mousePos.active) {
          const dx = this.x - mousePos.x;
          const dy = this.y - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110 && dist > 0) {
            const force = (110 - dist) / 110;
            this.vx += (dx / dist) * force * 0.6;
            this.vy += (dy / dist) * force * 0.3;
          }
        }

        // Dissipate interactive nudge back to ambient
        this.vx *= 0.92;
        this.vy *= 0.92;

        if (this.y > height + 30 || this.x < -40 || this.x > width + 40) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);

        // 3D curl/tumbling projection using cosine & sine scaling
        const scaleX = Math.cos(this.flip);
        const scaleY = 0.75 + 0.25 * Math.sin(this.tilt);
        ctx.scale(scaleX, scaleY);

        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.3 + 0.65 * this.depth;

        // Elegant curved petal shape with natural organic contour
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size * 0.5, -this.size * 0.8, this.size, -this.size * 0.3, this.size * 0.4, this.size * 0.6);
        ctx.bezierCurveTo(0, this.size * 0.95, -this.size * 0.4, this.size * 0.6, -this.size * 0.4, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    }

    // Delicate floating golden stardust particles
    const GOLDEN_DUST_COUNT = 12;
    const goldParticles = [];
    for (let i = 0; i < GOLDEN_DUST_COUNT; i++) {
      goldParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 1 + Math.random() * 1.8,
        speedY: -(0.15 + Math.random() * 0.35),
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random(),
        alphaSpeed: 0.008 + Math.random() * 0.015
      });
    }

    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push(new Petal());
    }

    function animatePetals(now) {
      ctx.clearRect(0, 0, width, height);

      // Smooth global ambient breeze
      const time = now || 0;
      const globalWind = Math.sin(time * 0.0006) * 0.7 + Math.sin(time * 0.0015) * 0.3;

      // Draw delicate golden particles
      goldParticles.forEach(gp => {
        gp.y += gp.speedY;
        gp.x += gp.speedX + globalWind * 0.2;
        gp.alpha += gp.alphaSpeed;
        if (gp.alpha > 0.85 || gp.alpha < 0.15) gp.alphaSpeed = -gp.alphaSpeed;

        if (gp.y < -10) {
          gp.y = height + 10;
          gp.x = Math.random() * width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(gp.x, gp.y, gp.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0, Math.min(1, gp.alpha * 0.6))})`;
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();
        ctx.restore();
      });

      // Update and draw petals
      petals.forEach(p => {
        p.update(time, globalWind);
        p.draw();
      });

      if (!prefersReducedMotion) {
        requestAnimationFrame(animatePetals);
      }
    }

    requestAnimationFrame(animatePetals);
  }

  // =========================================================================
  // 10. SCROLL REVEAL & NAVIGATION SPY (INTERSECTION OBSERVER)
  // =========================================================================
  if ('IntersectionObserver' in window) {
    // 1. Reveal items on scroll
    const revealItems = document.querySelectorAll('.reveal-item');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealItems.forEach(item => revealObserver.observe(item));

    // 2. Navigation Active Link Spy
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');

    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    });

    sections.forEach(section => navObserver.observe(section));
  } else {
    // Fallback: reveal immediately
    document.querySelectorAll('.reveal-item').forEach(el => el.classList.add('is-revealed'));
  }

  // =========================================================================
  // 11. SUBTLE 3D CARD PARALLAX TILT (DESKTOP)
  // =========================================================================
  if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const tiltCards = document.querySelectorAll('.invitation-card, .detail-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        const maxTilt = card.classList.contains('invitation-card') ? 2.5 : 4;
        card.style.transform = `perspective(1000px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // =========================================================================
  // 12. TOAST NOTIFICATION HELPER
  // =========================================================================
  let toastTimeout = null;
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;

    toast.textContent = message;
    toast.classList.remove('hidden');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 3500);
  }
});
