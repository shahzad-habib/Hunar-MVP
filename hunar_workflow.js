/**
 * HUNAR — Unified Connected Marketplace Workflow & Global MVP State Controller
 * Connects Customer Journey, Worker Flow (React + HTML), and Admin Operations Suite.
 * Fully compatible with standard browser DOM. Preserves 100% pixel fidelity.
 */

(function () {
  // 1. Calculate relative root prefix to repository root
  function getRootPrefix() {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].getAttribute('src') || '';
      if (src.indexOf('hunar_workflow.js') !== -1) {
        return src.replace('hunar_workflow.js', '');
      }
    }
    const pathname = window.location.pathname.replace(/\\/g, '/');
    if (
      pathname.includes('/marketplace_prototype/') ||
      pathname.includes('/worker_registration/') ||
      pathname.includes('/admin_operations_suite/') ||
      pathname.includes('/financial_portal/') ||
      pathname.includes('/users_management/') ||
      pathname.includes('/worker_verification/') ||
      pathname.includes('/worker_portal/dist/')
    ) {
      return '../../';
    }
    if (pathname.includes('/landing_page/') || pathname.includes('/admin_panel/')) {
      return '../';
    }
    return './';
  }

  const ROOT = getRootPrefix();

  // 2. Canonical Target URLs
  const ROUTES = {
    landing: ROOT + 'landing_page/code.html',
    customerSignIn: ROOT + 'worker_registration/hunar_customer_sign_in_mobile_app_rounded_inputs/code.html',
    customerRegister: ROOT + 'worker_registration/hunar_customer_register_mobile_app_rounded_inputs/code.html',
    customerOtp: ROOT + 'worker_registration/hunar_customer_register_otp_verification_clean_mobile_app/code.html',
    customerDashboard: ROOT + 'marketplace_prototype/hunar_customer_dashboard/code.html',
    myJobs: ROOT + 'marketplace_prototype/my_jobs_hunar_customer_hub/code.html',
    postJob1: ROOT + 'marketplace_prototype/post_a_job_step_1_modern_service_selection/code.html',
    postJob2: ROOT + 'marketplace_prototype/post_a_job_step_2_3_details_media/code.html',
    postJob4: ROOT + 'marketplace_prototype/post_a_job_step_4_5_location_schedule/code.html',
    postJob6: ROOT + 'marketplace_prototype/post_a_job_step_6_review_post/code.html',
    jobOffers: ROOT + 'marketplace_prototype/job_details_offers_hunar/code.html',
    workerProfileModal: ROOT + 'marketplace_prototype/job_details_worker_profile_selection_modal_hunar/code.html',
    confirmBookingModal: ROOT + 'marketplace_prototype/job_details_select_worker_confirm_booking_modal_hunar/code.html',
    directChat: ROOT + 'marketplace_prototype/direct_chat_negotiation_hunar_customer_hub/code.html',
    arrivalTracker: ROOT + 'marketplace_prototype/scheduled_visits_arrival_tracker_hunar/code.html',
    escrowRelease: ROOT + 'marketplace_prototype/job_completion_escrow_release_hunar/code.html',
    customerWallet: ROOT + 'marketplace_prototype/payments_escrow_wallet_hunar/code.html',
    disputeCenter: ROOT + 'marketplace_prototype/dispute_resolution_help_center_hunar/code.html',
    customerSettings: ROOT + 'marketplace_prototype/customer_profile_settings_hunar/code.html',

    // Worker Persona
    workerWizard: ROOT + 'worker_registration/hunar_worker_registration_6_step_wizard_with_profile_photo_step/code.html',
    workerPortalReact: ROOT + 'worker_portal/dist/index.html',
    workerDashboardHTML: ROOT + 'marketplace_prototype/hunar_worker_dashboard/code.html',

    // Admin & Ops Persona
    adminDashboard: ROOT + 'marketplace_prototype/hunar_admin_operations_dashboard_modern/code.html',
    adminClassicPanel: ROOT + 'admin_panel/dashboard.html',
    adminAnalytics: ROOT + 'admin_operations_suite/analytics/code.html',
    adminNotifications: ROOT + 'admin_operations_suite/notifications/code.html',
    adminReports: ROOT + 'admin_operations_suite/reports_moderation/code.html',
    adminSettings: ROOT + 'admin_operations_suite/settings/code.html',
    adminVerification: ROOT + 'worker_verification/verification_overview_requests_teal_theme/code.html',
    adminVerificationDetail: ROOT + 'worker_verification/worker_verification_detail_ahmed_khan_teal_theme/code.html',
    adminUsers: ROOT + 'users_management/users_management_desktop_hunar_admin/code.html',
    adminUserDetail: ROOT + 'users_management/user_details_ahmed_khan_desktop_hunar_admin/code.html',
    adminJobs: ROOT + 'marketplace_prototype/jobs_management_work_orders_hunar_admin/code.html',
    adminTreasury: ROOT + 'financial_portal/commission_analytics_desktop/code.html',
    adminLedger: ROOT + 'financial_portal/transactions_ledger_desktop/code.html',
    adminDisputes: ROOT + 'financial_portal/refunds_dispute_management_desktop/code.html',

    // Central Showcase Hub
    showcaseHub: ROOT + 'showcase_catalog.html',
  };

  // 3. Persistent Local State (Job & Workflow Context)
  const DEFAULT_JOB = {
    id: 'J-7821',
    service: 'AC Repair & Maintenance',
    category: 'hvac',
    title: 'Split AC Cooling Leak & Gas Refill',
    details: '1.5 ton split AC not cooling properly and making strange noise. Needs inspection and refrigerant recharge.',
    address: 'House 14, Street 7, Hayatabad Phase 3, Peshawar',
    schedule: 'Today, Within 1-2 Hours (Urgent)',
    urgency: 'urgent',
    status: 'offers_received',
    visitFee: 300,
    repairFee: 2685,
    totalFee: 2985,
    selectedWorker: {
      name: 'Ali Khan',
      role: 'Certified Senior HVAC & AC Specialist',
      rating: '4.9',
      jobsCompleted: 124,
      visitFee: 300
    }
  };

  function getJobState() {
    try {
      const data = localStorage.getItem('HUNAR_ACTIVE_JOB');
      return data ? JSON.parse(data) : DEFAULT_JOB;
    } catch (e) {
      return DEFAULT_JOB;
    }
  }

  function setJobState(updates) {
    try {
      const current = getJobState();
      const updated = Object.assign({}, current, updates);
      localStorage.setItem('HUNAR_ACTIVE_JOB', JSON.stringify(updated));
      return updated;
    } catch (e) {
      return updates;
    }
  }

  // Helper to match text inside elements
  function matchText(el, text) {
    return (el.textContent || '').toLowerCase().includes(text.toLowerCase());
  }

  // 4. Page Specific Dynamic Wire-ups
  function wirePageInteractions() {
    const p = window.location.pathname.replace(/\\/g, '/');

    // A. Landing Page
    if (p.includes('/landing_page/code.html')) {
      document.querySelectorAll('a').forEach(el => {
        if (el.getAttribute('href') === '#post-job' || matchText(el, 'get started')) {
          el.setAttribute('href', ROUTES.postJob1);
        }
      });
      document.querySelectorAll('button').forEach(btn => {
        if (matchText(btn, 'search')) {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            const catSelect = document.querySelector('select');
            const category = catSelect ? catSelect.value : 'HVAC & AC Cooling';
            setJobState({ service: category || 'AC Repair & Maintenance' });
            window.location.href = ROUTES.postJob1;
          });
        }
      });
    }

    // B. Post a Job Step 1
    if (p.includes('post_a_job_step_1_modern_service_selection')) {
      const cards = document.querySelectorAll('.category-card, [data-service]');
      cards.forEach(card => {
        card.addEventListener('click', () => {
          const h3 = card.querySelector('h3');
          const serviceName = h3 ? h3.textContent.trim() : 'AC Service & Repair';
          setJobState({ service: serviceName });
        });
      });

      document.querySelectorAll('button').forEach(btn => {
        if (matchText(btn, 'next')) {
          btn.addEventListener('click', () => {
            window.location.href = ROUTES.postJob2;
          });
        }
        if (matchText(btn, 'back')) {
          btn.addEventListener('click', () => {
            window.location.href = ROUTES.customerDashboard;
          });
        }
      });
    }

    // C. Post a Job Step 2 & 3
    if (p.includes('post_a_job_step_2_3_details_media')) {
      document.querySelectorAll('button').forEach(btn => {
        if (matchText(btn, 'next')) {
          btn.addEventListener('click', () => {
            const textarea = document.querySelector('textarea');
            if (textarea && textarea.value) setJobState({ details: textarea.value });
            window.location.href = ROUTES.postJob4;
          });
        }
        if (matchText(btn, 'back')) {
          btn.addEventListener('click', () => {
            window.location.href = ROUTES.postJob1;
          });
        }
      });
    }

    // D. Post a Job Step 4 & 5
    if (p.includes('post_a_job_step_4_5_location_schedule')) {
      document.querySelectorAll('button').forEach(btn => {
        if (matchText(btn, 'review job') || matchText(btn, 'next')) {
          btn.addEventListener('click', () => {
            window.location.href = ROUTES.postJob6;
          });
        }
        if (matchText(btn, 'back')) {
          btn.addEventListener('click', () => {
            window.location.href = ROUTES.postJob2;
          });
        }
      });
    }

    // E. Post a Job Step 6
    if (p.includes('post_a_job_step_6_review_post')) {
      document.querySelectorAll('button').forEach(btn => {
        if (matchText(btn, 'post job') || matchText(btn, 'confirm')) {
          btn.addEventListener('click', () => {
            setJobState({ status: 'offers_received' });
            window.location.href = ROUTES.jobOffers;
          });
        }
        if (matchText(btn, 'back')) {
          btn.addEventListener('click', () => {
            window.location.href = ROUTES.postJob4;
          });
        }
      });
    }

    // F. Job Details & Offers
    if (p.includes('job_details_offers_hunar')) {
      document.querySelectorAll('button').forEach(btn => {
        if (matchText(btn, 'view profile')) {
          btn.addEventListener('click', () => {
            window.location.href = ROUTES.workerProfileModal;
          });
        }
        if (matchText(btn, 'select worker')) {
          btn.addEventListener('click', () => {
            window.location.href = ROUTES.confirmBookingModal;
          });
        }
      });
      document.querySelectorAll('span, a').forEach(el => {
        if (matchText(el, 'back to my jobs')) {
          el.style.cursor = 'pointer';
          el.addEventListener('click', () => {
            window.location.href = ROUTES.myJobs;
          });
        }
      });
    }

    // G. Worker Profile Modal
    if (p.includes('job_details_worker_profile_selection_modal_hunar')) {
      document.querySelectorAll('button').forEach(btn => {
        if (matchText(btn, 'select worker') || matchText(btn, 'proceed') || matchText(btn, 'book')) {
          btn.addEventListener('click', () => {
            window.location.href = ROUTES.confirmBookingModal;
          });
        }
        if (matchText(btn, 'close') || btn.querySelector('.material-symbols-outlined')?.textContent === 'close') {
          btn.addEventListener('click', () => {
            window.location.href = ROUTES.jobOffers;
          });
        }
      });
    }

    // H. Direct Chat & Negotiation
    if (p.includes('direct_chat_negotiation')) {
      document.querySelectorAll('button, a').forEach(el => {
        if (matchText(el, 'track') || matchText(el, 'arrival') || matchText(el, 'schedule visit')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = ROUTES.arrivalTracker;
          });
        }
        if (matchText(el, 'escrow') || matchText(el, 'release') || matchText(el, 'complete job')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = ROUTES.escrowRelease;
          });
        }
        if (matchText(el, 'dispute') || matchText(el, 'report')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = ROUTES.disputeCenter;
          });
        }
      });

      // Interactive Chat Send
      const chatInput = document.querySelector('input[placeholder*="message"], input[placeholder*="Type"], textarea');
      const chatBox = document.querySelector('.overflow-y-auto, main');
      if (chatInput) {
        function doSend() {
          const text = chatInput.value.trim();
          if (!text) return;
          chatInput.value = '';
          const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const bubble = document.createElement('div');
          bubble.className = 'flex justify-end mb-4';
          bubble.innerHTML = `
            <div class="max-w-md bg-[#0F766E] text-white p-3 rounded-2xl rounded-tr-none shadow-sm">
              <p class="text-xs sm:text-sm">${text}</p>
              <span class="text-[10px] text-teal-100/75 block text-right mt-1">${now} · Sent</span>
            </div>
          `;
          if (chatBox) {
            chatBox.appendChild(bubble);
            chatBox.scrollTop = chatBox.scrollHeight;
          }
          setTimeout(() => {
            const reply = document.createElement('div');
            reply.className = 'flex justify-start mb-4';
            reply.innerHTML = `
              <div class="max-w-md bg-white border border-[#E2E8F0] text-[#1A1A2E] p-3 rounded-2xl rounded-tl-none shadow-sm">
                <p class="text-xs sm:text-sm">Ji Ahmed sahib! Main bilkul raste mein hoon, 10-15 minute mein aapke location par pohanch raha hoon.</p>
                <span class="text-[10px] text-[#64748B] block text-left mt-1">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · Ali Khan (Verified Pro)</span>
              </div>
            `;
            if (chatBox) {
              chatBox.appendChild(reply);
              chatBox.scrollTop = chatBox.scrollHeight;
            }
          }, 1200);
        }
        chatInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            doSend();
          }
        });
      }
    }

    // I. Customer Hub Sidebars (Global Across all customer hub pages)
    document.querySelectorAll('aside nav').forEach(nav => {
      nav.querySelectorAll('a, button').forEach(el => {
        const path = el.getAttribute('data-path') || '';
        if (path === 'post-a-job' || matchText(el, 'post a job')) el.setAttribute('href', ROUTES.postJob1);
        else if (path === 'customer-dashboard' || matchText(el, 'dashboard')) el.setAttribute('href', ROUTES.customerDashboard);
        else if (path === 'my-jobs' || matchText(el, 'my jobs') || matchText(el, 'jobs')) el.setAttribute('href', ROUTES.myJobs);
        else if (path === 'offers-and-bids' || matchText(el, 'offers')) el.setAttribute('href', ROUTES.jobOffers);
        else if (path === 'service-bookings' || matchText(el, 'visits') || matchText(el, 'bookings')) el.setAttribute('href', ROUTES.arrivalTracker);
        else if (path === 'messages' || matchText(el, 'messages') || matchText(el, 'chat')) el.setAttribute('href', ROUTES.directChat);
        else if (path === 'payments-and-escrow' || matchText(el, 'wallet') || matchText(el, 'payments')) el.setAttribute('href', ROUTES.customerWallet);
        else if (path === 'customer-profile' || matchText(el, 'settings') || matchText(el, 'profile')) el.setAttribute('href', ROUTES.customerSettings);
        else if (path === 'guarantee-policy' || matchText(el, 'help') || matchText(el, 'support') || matchText(el, 'dispute')) el.setAttribute('href', ROUTES.disputeCenter);
      });
    });

    // J. Customer Dashboard
    if (p.includes('hunar_customer_dashboard')) {
      document.querySelectorAll('a, button').forEach(el => {
        if (matchText(el, 'post a job') || matchText(el, 'new job')) {
          el.setAttribute('href', ROUTES.postJob1);
          el.addEventListener('click', () => { window.location.href = ROUTES.postJob1; });
        }
        if (matchText(el, 'view offers') || matchText(el, 'receiving offers')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = ROUTES.jobOffers;
          });
        }
        if (matchText(el, 'track arrival') || matchText(el, 'track technician')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = ROUTES.arrivalTracker;
          });
        }
        if (matchText(el, 'details') && el.closest('.border')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = ROUTES.arrivalTracker;
          });
        }
        if (matchText(el, 'message') && el.closest('.border')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = ROUTES.directChat;
          });
        }
      });
    }

    // J2. My Jobs Hub
    if (p.includes('my_jobs_hunar_customer_hub')) {
      document.querySelectorAll('button, a').forEach(el => {
        if (matchText(el, 'post a job') || matchText(el, 'new job')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = ROUTES.postJob1;
          });
        }
        if (matchText(el, 'compare') || matchText(el, 'quotes') || matchText(el, 'offers')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = ROUTES.jobOffers;
          });
        }
        if (matchText(el, 'review & release') || matchText(el, 'release escrow')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = ROUTES.escrowRelease;
          });
        }
        if (matchText(el, 'message pros') || matchText(el, 'chat')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = ROUTES.directChat;
          });
        }
        if (matchText(el, 'track arrival') || matchText(el, 'track technician')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = ROUTES.arrivalTracker;
          });
        }
      });
    }

    // K. Customer Auth (worker_registration)
    const isMobileAuth = p.includes('mobile_app') || p.includes('clean_mobile');
    const mobileRegister = ROOT + 'worker_registration/hunar_customer_register_mobile_app_rounded_inputs/code.html';
    const mobileSignIn = ROOT + 'worker_registration/hunar_customer_sign_in_mobile_app_rounded_inputs/code.html';
    const mobileOtp = ROOT + 'worker_registration/hunar_customer_register_otp_verification_clean_mobile_app/code.html';

    if (p.includes('hunar_customer_sign_in')) {
      document.querySelectorAll('a').forEach(a => {
        if (matchText(a, 'register') || matchText(a, 'sign up') || matchText(a, 'create account')) {
          a.setAttribute('href', isMobileAuth ? mobileRegister : ROUTES.customerRegister);
        }
      });
      const form = document.querySelector('form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          window.location.href = ROUTES.customerDashboard;
        });
      }
      document.querySelectorAll('button').forEach(btn => {
        if (matchText(btn, 'sign in') || matchText(btn, 'continue') || matchText(btn, 'login')) {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = ROUTES.customerDashboard;
          });
        }
      });
    }
    if (p.includes('hunar_customer_register')) {
      const form = document.querySelector('form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          window.location.href = isMobileAuth ? mobileOtp : ROUTES.customerOtp;
        });
      }
      document.querySelectorAll('a').forEach(a => {
        if (matchText(a, 'sign in') || matchText(a, 'log in')) {
          a.setAttribute('href', isMobileAuth ? mobileSignIn : ROUTES.customerSignIn);
        }
      });
      document.querySelectorAll('button').forEach(btn => {
        if (matchText(btn, 'register') || matchText(btn, 'create account') || matchText(btn, 'google') || matchText(btn, 'apple')) {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = isMobileAuth ? mobileOtp : ROUTES.customerOtp;
          });
        }
      });
    }
    if (p.includes('hunar_customer_register_otp')) {
      document.querySelectorAll('button').forEach(btn => {
        if (matchText(btn, 'verify') || matchText(btn, 'continue') || matchText(btn, 'submit')) {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = ROUTES.customerDashboard;
          });
        }
      });
    }

    // L. Worker 6-Step Registration Wizard
    if (p.includes('hunar_worker_registration_6_step_wizard')) {
      document.querySelectorAll('button').forEach(btn => {
        if (matchText(btn, 'submit registration') || matchText(btn, 'complete registration') || matchText(btn, 'go to portal')) {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.innerHTML = `<span class="material-symbols-outlined animate-spin text-sm">sync</span> Activating Profile...`;
            setTimeout(() => {
              window.location.href = ROUTES.workerDashboardHTML;
            }, 800);
          });
        }
      });
    }

    // M. Admin Operations Suite (admin_operations_suite)
    if (p.includes('/admin_operations_suite/') || p.includes('hunar_admin_operations_dashboard_modern')) {
      document.querySelectorAll('aside nav a, aside nav button').forEach(a => {
        const path = a.getAttribute('data-path') || '';
        if (path === 'dashboard' || matchText(a, 'dashboard')) a.setAttribute('href', ROUTES.adminDashboard);
        else if (path === 'users' || matchText(a, 'users')) a.setAttribute('href', ROUTES.adminUsers);
        else if (path === 'jobs' || matchText(a, 'jobs')) a.setAttribute('href', ROUTES.adminJobs);
        else if (path === 'verification' || matchText(a, 'verification')) a.setAttribute('href', ROUTES.adminVerification);
        else if (path === 'payments' || matchText(a, 'payments')) a.setAttribute('href', ROUTES.adminTreasury);
        else if (path === 'disputes' || matchText(a, 'disputes')) a.setAttribute('href', ROUTES.adminDisputes);
        else if (path === 'reports' || matchText(a, 'reports')) a.setAttribute('href', ROUTES.adminReports);
        else if (path === 'notifications' || matchText(a, 'notifications')) a.setAttribute('href', ROUTES.adminNotifications);
        else if (path === 'analytics' || matchText(a, 'analytics')) a.setAttribute('href', ROUTES.adminAnalytics);
        else if (path === 'settings' || matchText(a, 'settings')) a.setAttribute('href', ROUTES.adminSettings);
      });
    }

    // N. Worker Verification
    if (p.includes('verification_overview_requests_teal_theme')) {
      document.querySelectorAll('tr, .cursor-pointer, [data-worker-id]').forEach(row => {
        if (matchText(row, 'ahmed khan') || matchText(row, 'view request')) {
          row.style.cursor = 'pointer';
          row.addEventListener('click', () => {
            window.location.href = ROUTES.adminVerificationDetail;
          });
        }
      });
    }
    if (p.includes('worker_verification_detail_ahmed_khan')) {
      document.querySelectorAll('button').forEach(btn => {
        if (matchText(btn, 'approve')) {
          btn.addEventListener('click', () => {
            alert('Worker Ahmed Khan has been successfully verified! CNIC and credentials confirmed.');
            window.location.href = ROUTES.adminVerification;
          });
        }
        if (matchText(btn, 'back')) {
          btn.addEventListener('click', () => {
            window.location.href = ROUTES.adminVerification;
          });
        }
      });
    }

    // O. Users Management
    if (p.includes('users_management')) {
      document.querySelectorAll('tr').forEach(row => {
        if (matchText(row, 'ahmed khan') || matchText(row, 'customer')) {
          row.style.cursor = 'pointer';
          row.addEventListener('click', () => {
            window.location.href = ROUTES.adminUserDetail;
          });
        }
      });
      document.querySelectorAll('button, a').forEach(el => {
        if (matchText(el, 'back to users')) {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = ROUTES.adminUsers;
          });
        }
      });
    }

    // P. Classic Admin Panel
    if (p.includes('/admin_panel/')) {
      const panelNav = document.querySelector('nav.sidebar-nav');
      if (panelNav) {
        panelNav.querySelectorAll('a').forEach(a => {
          if (matchText(a, 'dashboard')) a.setAttribute('href', 'dashboard.html');
          else if (matchText(a, 'workers')) a.setAttribute('href', 'index.html');
          else if (matchText(a, 'customers')) a.setAttribute('href', 'customers.html');
          else if (matchText(a, 'payments')) a.setAttribute('href', 'payments.html');
          else if (matchText(a, 'reports')) a.setAttribute('href', 'reports.html');
          else if (matchText(a, 'notifications')) a.setAttribute('href', 'notifications.html');
          else if (matchText(a, 'settings')) a.setAttribute('href', 'settings.html');
        });
      }
    }
  }

  // 5. Render Global Quick Switcher Ribbon
  function renderGlobalRibbon() {
    if (document.getElementById('hunar-mvp-ribbon')) return;

    const isMinimized = localStorage.getItem('HUNAR_HUD_MINIMIZED') !== 'false';

    const container = document.createElement('div');
    container.id = 'hunar-mvp-ribbon';
    container.style.cssText = `
      position: fixed;
      bottom: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999999;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      transition: all 0.25s ease;
    `;

    const bar = document.createElement('div');
    bar.id = 'hunar-hud-expanded';
    bar.style.cssText = `
      display: ${isMinimized ? 'none' : 'flex'};
      align-items: center;
      gap: 5px;
      background: rgba(26, 26, 46, 0.96);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(15, 118, 110, 0.25);
      border-radius: 9999px;
      padding: 5px 8px;
      color: white;
      font-size: 11px;
      font-weight: 500;
    `;

    // Pill Logo Badge
    const badge = document.createElement('div');
    badge.style.cssText = `
      display: flex;
      align-items: center;
      gap: 5px;
      background: #0F766E;
      color: white;
      padding: 3px 9px;
      border-radius: 9999px;
      font-weight: 700;
      letter-spacing: 0.5px;
      font-size: 10px;
      margin-right: 3px;
    `;
    badge.innerHTML = `<span>⚡ HUNAR</span><span style="opacity:0.75;font-weight:400">MVP</span>`;
    bar.appendChild(badge);

    // Nav Items
    const items = [
      { label: 'Home', icon: 'home', href: ROUTES.landing },
      { label: 'Customer Hub', icon: 'person', href: ROUTES.customerDashboard },
      { label: 'Worker Hub', icon: 'engineering', href: ROUTES.workerDashboardHTML },
      { label: 'Worker App (React)', icon: 'bolt', href: ROUTES.workerPortalReact, highlight: true },
      { label: 'Admin Portal', icon: 'admin_panel_settings', href: ROUTES.adminDashboard },
    ];

    items.forEach(item => {
      const btn = document.createElement('a');
      btn.href = item.href;
      btn.style.cssText = `
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 8px;
        border-radius: 9999px;
        text-decoration: none;
        color: ${item.highlight ? '#34D399' : 'rgba(255, 255, 255, 0.85)'};
        background: ${item.highlight ? 'rgba(15, 118, 110, 0.35)' : 'transparent'};
        border: 1px solid ${item.highlight ? 'rgba(52, 211, 153, 0.3)' : 'transparent'};
        transition: all 0.15s ease;
        white-space: nowrap;
        font-weight: ${item.highlight ? '600' : '500'};
      `;
      btn.onmouseenter = () => {
        btn.style.background = 'rgba(255, 255, 255, 0.15)';
        btn.style.color = '#FFFFFF';
      };
      btn.onmouseleave = () => {
        btn.style.background = item.highlight ? 'rgba(15, 118, 110, 0.35)' : 'transparent';
        btn.style.color = item.highlight ? '#34D399' : 'rgba(255, 255, 255, 0.85)';
      };

      btn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">${item.icon}</span><span>${item.label}</span>`;
      bar.appendChild(btn);
    });

    // Minimize Button
    const minBtn = document.createElement('button');
    minBtn.style.cssText = `
      background: transparent;
      border: 0;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      padding: 3px 5px;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 2px;
    `;
    minBtn.title = 'Minimize MVP Switcher';
    minBtn.innerHTML = `<span class="material-symbols-outlined" style="font-size: 15px;">close</span>`;
    minBtn.onclick = () => {
      bar.style.display = 'none';
      bubble.style.display = 'flex';
      localStorage.setItem('HUNAR_HUD_MINIMIZED', 'true');
    };
    bar.appendChild(minBtn);

    // Collapsed Bubble
    const bubble = document.createElement('button');
    bubble.id = 'hunar-hud-bubble';
    bubble.style.cssText = `
      display: ${isMinimized ? 'flex' : 'none'};
      align-items: center;
      gap: 5px;
      background: #0F766E;
      color: white;
      padding: 6px 12px;
      border-radius: 9999px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      cursor: pointer;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
    `;
    bubble.title = 'Open HUNAR MVP Flow Switcher';
    bubble.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">apps</span><span>HUNAR MVP</span>`;
    bubble.onclick = () => {
      bubble.style.display = 'none';
      bar.style.display = 'flex';
      localStorage.setItem('HUNAR_HUD_MINIMIZED', 'false');
    };

    container.appendChild(bar);
    container.appendChild(bubble);
    document.body.appendChild(container);
  }

  // 6. Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      wirePageInteractions();
      renderGlobalRibbon();
    });
  } else {
    wirePageInteractions();
    renderGlobalRibbon();
  }
})();
