/* ==========================================================
   SUPPORTTECH - ADMIN PORTAL CONTROLLER (admin.js)
   Tienda Independiente de Cómputo - Sucursal Única en Jalpan
   Propietario / Administrador: Jahir
   ========================================================== */

// --- DATOS INICIALES (TIENDA INDEPENDIENTE EN JALPAN) ---
const DEFAULT_PRODUCTS = [
    {
        id: "PROD-001",
        sku: "GPU-RX6600-8G",
        name: "AMD Radeon RX 6600 (8 GB GDDR6)",
        category: "Tarjetas Gráficas",
        cost: 3600,
        price: 4999,
        stock: 8,
        minStock: 3,
        branch: "Tienda Jalpan",
        image: "Assets/Componentes/GPU/rx6600.jpg"
    },
    {
        id: "PROD-002",
        sku: "CPU-RYZEN5-5500",
        name: "AMD Ryzen 5 5500 (6 Core / 12 Hilos)",
        category: "Procesadores",
        cost: 1450,
        price: 2199,
        stock: 12,
        minStock: 4,
        branch: "Tienda Jalpan",
        image: "Assets/Componentes/Procesador/ryzen5500.jpg"
    },
    {
        id: "PROD-003",
        sku: "RAM-FURY-16G",
        name: "Memoria RAM Kingston Fury 16GB (2x8GB) DDR4",
        category: "Memorias RAM",
        cost: 650,
        price: 980,
        stock: 22,
        minStock: 5,
        branch: "Tienda Jalpan",
        image: "Assets/Componentes/RAM/RAM8x2.png"
    },
    {
        id: "PROD-004",
        sku: "LAP-NITRO-V15",
        name: "Laptop Gamer Acer Nitro V15 RTX 4050",
        category: "Laptops",
        cost: 14200,
        price: 18999,
        stock: 3,
        minStock: 2,
        branch: "Tienda Jalpan",
        image: "Assets/Componentes/Laptops/Nitrov15.jpg"
    },
    {
        id: "PROD-005",
        sku: "CASE-GAMER-RGB",
        name: "Gabinete Gamer ATX Cristal Templado + 3 Fans",
        category: "Gabinetes",
        cost: 850,
        price: 1350,
        stock: 9,
        minStock: 3,
        branch: "Tienda Jalpan",
        image: "Assets/Componentes/Gabinetes/gabinete1.jpg"
    },
    {
        id: "PROD-006",
        sku: "MB-B450M-AM4",
        name: "Tarjeta Madre B450M AM4 DDR4",
        category: "Tarjetas Madre",
        cost: 1100,
        price: 1650,
        stock: 2,
        minStock: 3,
        branch: "Tienda Jalpan",
        image: "Assets/Componentes/Motherboard/b450.png"
    },
    {
        id: "PROD-007",
        sku: "PSU-600W-80B",
        name: "Fuente de Poder 600W 80 Plus Bronce",
        category: "Fuentes de Poder",
        cost: 750,
        price: 1199,
        stock: 15,
        minStock: 4,
        branch: "Tienda Jalpan",
        image: "Assets/Componentes/Fuentes de poder/Fuentedepoder600w80plusBronce.jpg"
    },
    {
        id: "PROD-008",
        sku: "FAN-120-ARGB",
        name: "Kit 3 Ventiladores 120mm ARGB Silenciosos",
        category: "Ventiladores",
        cost: 400,
        price: 699,
        stock: 18,
        minStock: 5,
        branch: "Tienda Jalpan",
        image: "Assets/Componentes/Ventiladores/Ventilador120mm.jpg"
    },
    {
        id: "PROD-009",
        sku: "SSD-1TB-NVME",
        name: "SSD M.2 NVMe 1TB PCIe 4.0 3500MB/s",
        category: "Almacenamiento SSD",
        cost: 950,
        price: 1499,
        stock: 14,
        minStock: 4,
        branch: "Tienda Jalpan",
        image: "Assets/Componentes/SSD/SSD1TBL.jpg"
    },
    {
        id: "PROD-010",
        sku: "MON-24-165HZ",
        name: "Monitor Gamer 24\" FHD 165Hz IPS 1ms",
        category: "Monitores",
        cost: 2100,
        price: 3199,
        stock: 5,
        minStock: 2,
        branch: "Tienda Jalpan",
        image: "Assets/Componentes/Monitores/Monitor24p.jpg"
    }
];

// Ventas iniciales simuladas en la tienda de Jalpan
function generateInitialSales() {
    const today = new Date();
    const sales = [];
    
    const getDateOffset = (daysAgo, hours = 14) => {
        const d = new Date(today);
        d.setDate(d.getDate() - daysAgo);
        d.setHours(hours, Math.floor(Math.random() * 50) + 5, 0);
        return d.toISOString();
    };

    const dummySalesConfig = [
        { daysAgo: 0, hours: 10, client: "Gael Hernández", seller: "Jahir", branch: "Tienda Jalpan", payment: "Efectivo", items: [{ prodId: "PROD-001", qty: 1 }, { prodId: "PROD-009", qty: 1 }] },
        { daysAgo: 0, hours: 13, client: "Mariana Rivas", seller: "Carlos Mendoza", branch: "Tienda Jalpan", payment: "Tarjeta", items: [{ prodId: "PROD-002", qty: 1 }, { prodId: "PROD-003", qty: 1 }] },
        { daysAgo: 0, hours: 16, client: "David Torres", seller: "Laura Morales", branch: "Tienda Jalpan", payment: "Transferencia SPEI", items: [{ prodId: "PROD-004", qty: 1 }] },
        
        { daysAgo: 1, hours: 11, client: "Pedro Sánchez", seller: "Carlos Mendoza", branch: "Tienda Jalpan", payment: "Efectivo", items: [{ prodId: "PROD-010", qty: 1 }] },
        { daysAgo: 2, hours: 15, client: "Sofía Montes", seller: "Jahir", branch: "Tienda Jalpan", payment: "Tarjeta", items: [{ prodId: "PROD-006", qty: 1 }, { prodId: "PROD-002", qty: 1 }] },
        { daysAgo: 3, hours: 12, client: "Carlos Fuentes", seller: "Laura Morales", branch: "Tienda Jalpan", payment: "Efectivo", items: [{ prodId: "PROD-007", qty: 1 }, { prodId: "PROD-008", qty: 2 }] },
        { daysAgo: 4, hours: 17, client: "Andrea Luna", seller: "Carlos Mendoza", branch: "Tienda Jalpan", payment: "Tarjeta", items: [{ prodId: "PROD-001", qty: 1 }] },
        { daysAgo: 5, hours: 14, client: "Jorge Ramos", seller: "Jahir", branch: "Tienda Jalpan", payment: "Transferencia SPEI", items: [{ prodId: "PROD-004", qty: 1 }, { prodId: "PROD-003", qty: 2 }] },
        { daysAgo: 6, hours: 11, client: "Karla Vega", seller: "Carlos Mendoza", branch: "Tienda Jalpan", payment: "Tarjeta", items: [{ prodId: "PROD-010", qty: 2 }] },
        
        { daysAgo: 10, hours: 16, client: "Manuel Ortiz", seller: "Laura Morales", branch: "Tienda Jalpan", payment: "Efectivo", items: [{ prodId: "PROD-005", qty: 1 }, { prodId: "PROD-007", qty: 1 }] },
        { daysAgo: 15, hours: 12, client: "Patricia Gil", seller: "Carlos Mendoza", branch: "Tienda Jalpan", payment: "Tarjeta", items: [{ prodId: "PROD-001", qty: 2 }] },
        { daysAgo: 20, hours: 15, client: "Fernando Ruiz", seller: "Jahir", branch: "Tienda Jalpan", payment: "Transferencia SPEI", items: [{ prodId: "PROD-002", qty: 2 }, { prodId: "PROD-003", qty: 2 }] },
        { daysAgo: 25, hours: 14, client: "Elena Salazar", seller: "Jahir", branch: "Tienda Jalpan", payment: "Tarjeta", items: [{ prodId: "PROD-004", qty: 1 }] }
    ];

    dummySalesConfig.forEach((cfg, idx) => {
        let total = 0;
        let subtotal = 0;
        let totalCost = 0;
        const expandedItems = cfg.items.map(item => {
            const p = DEFAULT_PRODUCTS.find(prod => prod.id === item.prodId);
            const lineTotal = p.price * item.qty;
            const lineCost = p.cost * item.qty;
            subtotal += lineTotal;
            totalCost += lineCost;
            return {
                id: p.id,
                name: p.name,
                category: p.category,
                price: p.price,
                cost: p.cost,
                qty: item.qty,
                total: lineTotal
            };
        });

        total = subtotal;
        const ticketNum = `ST-${1000 + idx}`;

        sales.push({
            id: ticketNum,
            date: getDateOffset(cfg.daysAgo, cfg.hours),
            client: cfg.client,
            seller: cfg.seller,
            branch: "Tienda Jalpan",
            paymentMethod: cfg.payment,
            items: expandedItems,
            subtotal: Math.round(total / 1.16),
            tax: Math.round(total - (total / 1.16)),
            total: total,
            totalCost: totalCost,
            profit: total - totalCost,
            status: "Completada"
        });
    });

    return sales;
}

const DEFAULT_USERS = [
    {
        id: "USR-001",
        name: "Jahir",
        email: "jahir@supporttech.com",
        role: "ADMIN",
        branch: "Tienda Jalpan (Propietario)",
        status: "Activo",
        lastLogin: "En línea",
        avatar: "J"
    },
    {
        id: "USR-002",
        name: "Carlos Mendoza",
        email: "carlos.ventas@supporttech.com",
        role: "VENDEDOR",
        branch: "Tienda Jalpan",
        status: "Activo",
        lastLogin: "Hoy 09:30 AM",
        avatar: "CM"
    },
    {
        id: "USR-003",
        name: "Laura Morales",
        email: "laura.ventas@supporttech.com",
        role: "VENDEDOR",
        branch: "Tienda Jalpan",
        status: "Activo",
        lastLogin: "Hoy 10:15 AM",
        avatar: "LM"
    }
];

// --- GESTOR DE ESTADO CON MIGRACIÓN AUTOMÁTICA ---
const State = {
    products: null,
    sales: null,
    users: null,
    currentRole: localStorage.getItem("st_admin_current_role") || "ADMIN",
    cart: [],
    charts: {},

    init() {
        // Cargar o migrar datos para asegurar que Jahir y Tienda Jalpan estén presentes
        let rawProd = localStorage.getItem("st_admin_products");
        let rawSales = localStorage.getItem("st_admin_sales");
        let rawUsers = localStorage.getItem("st_admin_users");

        // Si existen datos anteriores con "Alfredo" o múltiples sucursales, migrar a los nuevos datos limpios
        if (rawUsers && rawUsers.includes("Alfredo") || (rawProd && rawProd.includes("Querétaro"))) {
            localStorage.removeItem("st_admin_products");
            localStorage.removeItem("st_admin_sales");
            localStorage.removeItem("st_admin_users");
            rawProd = null;
            rawSales = null;
            rawUsers = null;
        }

        this.products = rawProd ? JSON.parse(rawProd) : DEFAULT_PRODUCTS;
        this.sales = rawSales ? JSON.parse(rawSales) : generateInitialSales();
        this.users = rawUsers ? JSON.parse(rawUsers) : DEFAULT_USERS;

        this.saveProducts();
        this.saveSales();
        this.saveUsers();
    },

    saveProducts() {
        localStorage.setItem("st_admin_products", JSON.stringify(this.products));
    },
    saveSales() {
        localStorage.setItem("st_admin_sales", JSON.stringify(this.sales));
    },
    saveUsers() {
        localStorage.setItem("st_admin_users", JSON.stringify(this.users));
    },
    saveRole(role) {
        this.currentRole = role;
        localStorage.setItem("st_admin_current_role", role);
    },
    resetData() {
        localStorage.removeItem("st_admin_products");
        localStorage.removeItem("st_admin_sales");
        localStorage.removeItem("st_admin_users");
        this.products = DEFAULT_PRODUCTS;
        this.sales = generateInitialSales();
        this.users = DEFAULT_USERS;
        this.saveProducts();
        this.saveSales();
        this.saveUsers();
        location.reload();
    }
};

// --- INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
    State.init();
    initNavigation();
    initRoleSwitcher();
    initDashboard();
    initInventory();
    initPOS();
    initSalesHistory();
    initAnalytics();
    initUsers();
    initMobileSidebar();
    applyRolePermissions();
});

// --- SISTEMA DE TOASTS ---
function showToast(message, type = "success") {
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = "✔";
    if (type === "danger") icon = "✖";
    if (type === "warning") icon = "⚠";

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// --- FORMATEO DE MONEDA ---
function formatMoney(amount) {
    return "$" + Number(amount || 0).toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " MXN";
}

// --- NAVEGACIÓN ENTRE PESTAÑAS ---
function initNavigation() {
    const navItems = document.querySelectorAll(".nav-item");
    const tabPanes = document.querySelectorAll(".tab-pane");

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetTab = item.getAttribute("data-tab");

            navItems.forEach(n => n.classList.remove("active"));
            tabPanes.forEach(p => p.classList.remove("active"));

            item.classList.add("active");
            const activePane = document.getElementById(targetTab);
            if (activePane) activePane.classList.add("active");

            document.querySelector(".admin-sidebar")?.classList.remove("open");

            if (targetTab === "tab-dashboard") renderDashboard();
            if (targetTab === "tab-inventory") renderInventoryTable();
            if (targetTab === "tab-pos") { renderPOSCatalog(); renderCart(); }
            if (targetTab === "tab-sales-history") renderSalesTable();
            if (targetTab === "tab-analytics") renderAnalytics();
            if (targetTab === "tab-users") renderUsersTable();
        });
    });
}

// --- CAMBIO DE ROL (RBAC) ---
function initRoleSwitcher() {
    const roleSelect = document.getElementById("headerRoleSelect");
    if (!roleSelect) return;

    roleSelect.value = State.currentRole;
    roleSelect.addEventListener("change", (e) => {
        State.saveRole(e.target.value);
        applyRolePermissions();
        showToast(`Rol cambiado a: ${e.target.value}`, "success");
    });
}

function applyRolePermissions() {
    const role = State.currentRole;
    const roleBadge = document.getElementById("userCurrentRoleBadge");
    const roleBanner = document.getElementById("rolePermissionAlert");

    if (roleBadge) {
        roleBadge.textContent = role;
        roleBadge.className = `badge-role ${role === 'ADMIN' ? 'badge-role-admin' : 'badge-role-seller'}`;
    }

    const adminOnlyElements = document.querySelectorAll(".admin-only");
    adminOnlyElements.forEach(el => {
        el.style.display = (role === "ADMIN") ? "" : "none";
    });

    if (roleBanner) {
        if (role === "VENDEDOR") {
            roleBanner.style.display = "flex";
            roleBanner.innerHTML = `<strong>💼 Modo VENDEDOR Activo:</strong> Permisos limitados a Terminal de Ventas (POS), consulta de existencias y emisión de tickets. Los costos de compra y márgenes están ocultos por seguridad.`;
        } else {
            roleBanner.style.display = "none";
        }
    }

    renderInventoryTable();
    renderDashboard();
}

// --- SIDEBAR MÓVIL ---
function initMobileSidebar() {
    const toggleBtn = document.getElementById("mobileMenuToggle");
    const sidebar = document.querySelector(".admin-sidebar");
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });
    }
}

// ==========================================================
// 1. DASHBOARD GENERAL
// ==========================================================
function initDashboard() {
    renderDashboard();
}

function renderDashboard() {
    const sales = State.sales;
    const products = State.products;
    const today = new Date().toISOString().split("T")[0];

    const todaySales = sales.filter(s => s.date.startsWith(today));
    const todayTotal = todaySales.reduce((acc, s) => acc + s.total, 0);

    const monthSales = sales.reduce((acc, s) => acc + s.total, 0);
    const lowStockCount = products.filter(p => p.stock <= p.minStock).length;
    const totalInventoryUnits = products.reduce((acc, p) => acc + p.stock, 0);

    const elMonthSales = document.getElementById("dashMonthSales");
    const elTodaySales = document.getElementById("dashTodaySales");
    const elTodayTransactions = document.getElementById("dashTodayTransactions");
    const elLowStockCount = document.getElementById("dashLowStockCount");
    const elTotalUnits = document.getElementById("dashTotalUnits");

    if (elMonthSales) elMonthSales.textContent = formatMoney(monthSales);
    if (elTodaySales) elTodaySales.textContent = formatMoney(todayTotal);
    if (elTodayTransactions) elTodayTransactions.textContent = `${todaySales.length} ventas hoy`;
    if (elLowStockCount) elLowStockCount.textContent = `${lowStockCount} alertas`;
    if (elTotalUnits) elTotalUnits.textContent = `${totalInventoryUnits} pzas`;

    // Tabla de ventas recientes
    const tbody = document.getElementById("dashRecentSalesTable");
    if (tbody) {
        const recent = [...sales].reverse().slice(0, 5);
        tbody.innerHTML = recent.map(s => `
            <tr>
                <td><strong>${s.id}</strong></td>
                <td>${new Date(s.date).toLocaleDateString()} ${new Date(s.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                <td>${s.client}</td>
                <td><span class="badge-role badge-role-seller">${s.seller}</span></td>
                <td><span style="color:var(--primary); font-size:12px;">${s.branch}</span></td>
                <td><strong>${formatMoney(s.total)}</strong></td>
                <td><span class="badge-status badge-instock">${s.status}</span></td>
            </tr>
        `).join("");
    }

    // Alertas de stock bajo
    const alertsContainer = document.getElementById("dashLowStockAlerts");
    if (alertsContainer) {
        const lowProducts = products.filter(p => p.stock <= p.minStock);
        if (lowProducts.length === 0) {
            alertsContainer.innerHTML = `<div style="padding: 15px; color: var(--success); text-align: center;">✔ Todo el inventario tiene niveles óptimos.</div>`;
        } else {
            alertsContainer.innerHTML = lowProducts.map(p => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; background:var(--bg-input); border-radius:6px; margin-bottom:8px; border-left:3px solid var(--warning);">
                    <div>
                        <div style="font-weight:600; font-size:13px; color:var(--text-title);">${p.name}</div>
                        <div style="font-size:11px; color:var(--text-muted);">Quedan solo <strong>${p.stock} unidades</strong> (Mínimo sugerido: ${p.minStock})</div>
                    </div>
                    <button class="btn btn-sm btn-primary" onclick="quickAddStock('${p.id}', 5)">+ Reponer 5</button>
                </div>
            `).join("");
        }
    }
}

// ==========================================================
// 2. CONTROL DE INVENTARIO
// ==========================================================
function initInventory() {
    const searchInput = document.getElementById("invSearchInput");
    const catFilter = document.getElementById("invCatFilter");
    const stockFilter = document.getElementById("invStockFilter");
    const btnNewProduct = document.getElementById("btnNewProduct");

    [searchInput, catFilter, stockFilter].forEach(el => {
        el?.addEventListener("input", renderInventoryTable);
    });

    btnNewProduct?.addEventListener("click", () => openProductModal());

    const costInput = document.getElementById("modalProdCost");
    const priceInput = document.getElementById("modalProdPrice");
    const marginDisplay = document.getElementById("modalProdMarginPreview");

    const updateMargin = () => {
        const cost = parseFloat(costInput.value) || 0;
        const price = parseFloat(priceInput.value) || 0;
        if (price > 0) {
            const margin = ((price - cost) / price) * 100;
            const profit = price - cost;
            marginDisplay.textContent = `Margen: ${margin.toFixed(1)}% (Ganancia: ${formatMoney(profit)})`;
            marginDisplay.style.color = margin > 20 ? "var(--success)" : "var(--warning)";
        } else {
            marginDisplay.textContent = "Margen: 0%";
        }
    };

    costInput?.addEventListener("input", updateMargin);
    priceInput?.addEventListener("input", updateMargin);

    document.getElementById("formProductModal")?.addEventListener("submit", (e) => {
        e.preventDefault();
        saveProductFromModal();
    });

    renderInventoryTable();
}

function renderInventoryTable() {
    const tbody = document.getElementById("inventoryTableBody");
    if (!tbody) return;

    const searchTerm = document.getElementById("invSearchInput")?.value.toLowerCase().trim() || "";
    const selectedCat = document.getElementById("invCatFilter")?.value || "Todas";
    const selectedStock = document.getElementById("invStockFilter")?.value || "Todos";

    let filtered = State.products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm) || p.sku.toLowerCase().includes(searchTerm);
        const matchesCat = selectedCat === "Todas" || p.category === selectedCat;
        
        let matchesStock = true;
        if (selectedStock === "instock") matchesStock = p.stock > p.minStock;
        if (selectedStock === "lowstock") matchesStock = p.stock <= p.minStock && p.stock > 0;
        if (selectedStock === "outstock") matchesStock = p.stock === 0;

        return matchesSearch && matchesCat && matchesStock;
    });

    const totalInventoryValue = filtered.reduce((acc, p) => acc + (p.price * p.stock), 0);
    const totalInventoryCost = filtered.reduce((acc, p) => acc + (p.cost * p.stock), 0);
    const totalItems = filtered.reduce((acc, p) => acc + p.stock, 0);

    const valEl = document.getElementById("invTotalValueDisplay");
    const costEl = document.getElementById("invTotalCostDisplay");
    const unitsEl = document.getElementById("invTotalUnitsDisplay");
    if (valEl) valEl.textContent = formatMoney(totalInventoryValue);
    if (costEl) costEl.textContent = formatMoney(totalInventoryCost);
    if (unitsEl) unitsEl.textContent = `${totalItems} unidades`;

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:var(--text-muted);">No se encontraron productos con los filtros aplicados.</td></tr>`;
        return;
    }

    const isAdmin = State.currentRole === "ADMIN";

    tbody.innerHTML = filtered.map(p => {
        let statusBadge = `<span class="badge-status badge-instock">En Stock</span>`;
        if (p.stock === 0) {
            statusBadge = `<span class="badge-status badge-outstock">Agotado</span>`;
        } else if (p.stock <= p.minStock) {
            statusBadge = `<span class="badge-status badge-lowstock">Bajo Stock</span>`;
        }

        const margin = (((p.price - p.cost) / p.price) * 100).toFixed(0);

        return `
            <tr>
                <td><code style="color:var(--primary-light); font-weight:700;">${p.sku}</code></td>
                <td>
                    <div class="product-cell">
                        <img src="${p.image}" alt="${p.name}" class="product-img" onerror="this.src='Assets/Main page image/logo tech.png'">
                        <div>
                            <div class="product-title">${p.name}</div>
                            <div class="product-sku">Mínimo sugerido: ${p.minStock} pzas</div>
                        </div>
                    </div>
                </td>
                <td>${p.category}</td>
                ${isAdmin ? `<td>${formatMoney(p.cost)}</td>` : ''}
                <td><strong>${formatMoney(p.price)}</strong></td>
                ${isAdmin ? `<td><span style="color:var(--success); font-weight:700;">${margin}%</span></td>` : ''}
                <td>
                    <div style="display:flex; align-items:center; gap:6px;">
                        <button class="btn btn-sm btn-secondary btn-icon" onclick="quickAddStock('${p.id}', -1)" title="Reducir stock">-</button>
                        <span style="font-weight:700; width:28px; text-align:center;">${p.stock}</span>
                        <button class="btn btn-sm btn-secondary btn-icon" onclick="quickAddStock('${p.id}', 1)" title="Aumentar stock">+</button>
                    </div>
                </td>
                <td>${statusBadge}</td>
                <td>
                    <div style="display:flex; gap:6px;">
                        <button class="btn btn-sm btn-secondary btn-icon" onclick="openProductModal('${p.id}')" title="Editar">✏</button>
                        ${isAdmin ? `<button class="btn btn-sm btn-danger btn-icon" onclick="deleteProduct('${p.id}')" title="Eliminar">🗑</button>` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join("");
}

function openProductModal(prodId = null) {
    const modal = document.getElementById("productModal");
    const modalTitle = document.getElementById("productModalTitle");
    const form = document.getElementById("formProductModal");

    form.reset();
    document.getElementById("modalProdId").value = "";

    if (prodId) {
        const prod = State.products.find(p => p.id === prodId);
        if (prod) {
            modalTitle.textContent = "Editar Producto";
            document.getElementById("modalProdId").value = prod.id;
            document.getElementById("modalProdSku").value = prod.sku;
            document.getElementById("modalProdName").value = prod.name;
            document.getElementById("modalProdCategory").value = prod.category;
            document.getElementById("modalProdCost").value = prod.cost;
            document.getElementById("modalProdPrice").value = prod.price;
            document.getElementById("modalProdStock").value = prod.stock;
            document.getElementById("modalProdMinStock").value = prod.minStock;
            document.getElementById("modalProdImage").value = prod.image;
        }
    } else {
        modalTitle.textContent = "Agregar Nuevo Producto";
        document.getElementById("modalProdSku").value = "ST-" + Math.floor(1000 + Math.random() * 9000);
        document.getElementById("modalProdMinStock").value = "3";
    }

    modal.classList.add("active");
}

function closeProductModal() {
    document.getElementById("productModal")?.classList.remove("active");
}

function saveProductFromModal() {
    const id = document.getElementById("modalProdId").value;
    const sku = document.getElementById("modalProdSku").value.trim();
    const name = document.getElementById("modalProdName").value.trim();
    const category = document.getElementById("modalProdCategory").value;
    const cost = parseFloat(document.getElementById("modalProdCost").value) || 0;
    const price = parseFloat(document.getElementById("modalProdPrice").value) || 0;
    const stock = parseInt(document.getElementById("modalProdStock").value) || 0;
    const minStock = parseInt(document.getElementById("modalProdMinStock").value) || 3;
    const image = document.getElementById("modalProdImage").value.trim() || "Assets/Main page image/logo tech.png";

    if (!sku || !name || price <= 0) {
        showToast("Por favor complete los campos obligatorios.", "danger");
        return;
    }

    if (id) {
        const index = State.products.findIndex(p => p.id === id);
        if (index !== -1) {
            State.products[index] = { ...State.products[index], sku, name, category, branch: "Tienda Jalpan", cost, price, stock, minStock, image };
            showToast("Producto actualizado exitosamente", "success");
        }
    } else {
        const newProduct = {
            id: "PROD-" + Date.now().toString().slice(-4),
            sku,
            name,
            category,
            branch: "Tienda Jalpan",
            cost,
            price,
            stock,
            minStock,
            image
        };
        State.products.push(newProduct);
        showToast("Nuevo producto añadido al inventario", "success");
    }

    State.saveProducts();
    closeProductModal();
    renderInventoryTable();
    renderDashboard();
    renderPOSCatalog();
}

function quickAddStock(prodId, delta) {
    const prod = State.products.find(p => p.id === prodId);
    if (!prod) return;

    if (prod.stock + delta < 0) {
        showToast("El stock no puede ser negativo", "warning");
        return;
    }

    prod.stock += delta;
    State.saveProducts();
    renderInventoryTable();
    renderDashboard();
    renderPOSCatalog();
    showToast(`Stock de ${prod.name.slice(0, 20)}... actualizado a ${prod.stock}`, "info");
}

function deleteProduct(prodId) {
    if (!confirm("¿Está seguro de eliminar este producto del inventario?")) return;
    State.products = State.products.filter(p => p.id !== prodId);
    State.saveProducts();
    renderInventoryTable();
    renderDashboard();
    renderPOSCatalog();
    showToast("Producto eliminado del inventario", "danger");
}

function exportInventoryCSV() {
    let csv = "SKU,Nombre,Categoria,Sucursal,Costo,Precio,Stock,MinStock\n";
    State.products.forEach(p => {
        csv += `"${p.sku}","${p.name}","${p.category}","Tienda Jalpan",${p.cost},${p.price},${p.stock},${p.minStock}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Inventario_SupportTech_Jalpan_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    showToast("Catálogo descargado en CSV", "success");
}

// ==========================================================
// 3. CONTROL DE VENTAS Y TERMINAL POS
// ==========================================================
function initPOS() {
    const search = document.getElementById("posSearchInput");
    search?.addEventListener("input", renderPOSCatalog);

    document.querySelectorAll(".pos-cat-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".pos-cat-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderPOSCatalog();
        });
    });

    document.getElementById("btnCompleteSale")?.addEventListener("click", completeSale);
    document.getElementById("btnClearCart")?.addEventListener("click", clearCart);

    renderPOSCatalog();
}

function renderPOSCatalog() {
    const grid = document.getElementById("posCatalogGrid");
    if (!grid) return;

    const searchTerm = document.getElementById("posSearchInput")?.value.toLowerCase().trim() || "";
    const activeCatBtn = document.querySelector(".pos-cat-btn.active");
    const activeCat = activeCatBtn ? activeCatBtn.getAttribute("data-cat") : "Todas";

    const filtered = State.products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm) || p.sku.toLowerCase().includes(searchTerm);
        const matchesCat = activeCat === "Todas" || p.category === activeCat;
        return matchesSearch && matchesCat;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--text-muted);">No hay productos en esta categoría.</div>`;
        return;
    }

    grid.innerHTML = filtered.map(p => {
        const isOutOfStock = p.stock <= 0;
        return `
            <div class="pos-card ${isOutOfStock ? 'disabled' : ''}" onclick="${isOutOfStock ? '' : `addToCart('${p.id}')`}" style="${isOutOfStock ? 'opacity:0.5; cursor:not-allowed;' : ''}">
                <img src="${p.image}" alt="${p.name}" onerror="this.src='Assets/Main page image/logo tech.png'">
                <div class="pos-card-name">${p.name}</div>
                <div class="pos-card-stock">${isOutOfStock ? '<span style="color:var(--danger); font-weight:700;">Agotado</span>' : `Stock: ${p.stock} pzas`}</div>
                <div class="pos-card-price">${formatMoney(p.price)}</div>
            </div>
        `;
    }).join("");
}

function addToCart(prodId) {
    const prod = State.products.find(p => p.id === prodId);
    if (!prod || prod.stock <= 0) {
        showToast("Producto sin existencias", "danger");
        return;
    }

    const cartItem = State.cart.find(item => item.id === prodId);
    if (cartItem) {
        if (cartItem.qty + 1 > prod.stock) {
            showToast(`Solo hay ${prod.stock} unidades en stock`, "warning");
            return;
        }
        cartItem.qty += 1;
    } else {
        State.cart.push({
            id: prod.id,
            sku: prod.sku,
            name: prod.name,
            price: prod.price,
            cost: prod.cost,
            category: prod.category,
            qty: 1
        });
    }

    renderCart();
}

function updateCartQty(prodId, delta) {
    const cartItem = State.cart.find(i => i.id === prodId);
    if (!cartItem) return;

    const prod = State.products.find(p => p.id === prodId);
    if (delta > 0 && prod && cartItem.qty + 1 > prod.stock) {
        showToast(`Stock máximo disponible alcanzado (${prod.stock})`, "warning");
        return;
    }

    cartItem.qty += delta;
    if (cartItem.qty <= 0) {
        State.cart = State.cart.filter(i => i.id !== prodId);
    }
    renderCart();
}

function removeFromCart(prodId) {
    State.cart = State.cart.filter(i => i.id !== prodId);
    renderCart();
}

function clearCart() {
    State.cart = [];
    renderCart();
}

function renderCart() {
    const container = document.getElementById("posCartList");
    const countBadge = document.getElementById("posCartCount");
    const subtotalEl = document.getElementById("posSubtotalDisplay");
    const taxEl = document.getElementById("posTaxDisplay");
    const totalEl = document.getElementById("posTotalDisplay");

    if (!container) return;

    const totalQty = State.cart.reduce((acc, i) => acc + i.qty, 0);
    const subtotal = State.cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    const tax = subtotal * 0.16;
    const total = subtotal;

    if (countBadge) countBadge.textContent = `${totalQty} ítems`;
    if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal / 1.16);
    if (taxEl) taxEl.textContent = formatMoney(subtotal - (subtotal / 1.16));
    if (totalEl) totalEl.textContent = formatMoney(total);

    if (State.cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; padding: 60px 20px; color:var(--text-muted);">
                <div style="font-size:36px; margin-bottom:10px;">🛒</div>
                <div style="font-weight:600;">El carrito de venta está vacío</div>
                <div style="font-size:12px; margin-top:4px;">Haz clic en cualquier componente para añadirlo al ticket.</div>
            </div>
        `;
        return;
    }

    container.innerHTML = State.cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name" title="${item.name}">${item.name}</div>
                <div class="cart-item-price">${formatMoney(item.price)} c/u</div>
            </div>
            <div class="cart-qty-ctrl">
                <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
                <span class="cart-qty-num">${item.qty}</span>
                <button class="cart-qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
            </div>
            <div style="font-weight:700; font-size:13px; color:var(--text-title); min-width:75px; text-align:right;">
                ${formatMoney(item.price * item.qty)}
            </div>
            <button class="btn btn-sm btn-danger btn-icon" onclick="removeFromCart('${item.id}')" title="Quitar">✖</button>
        </div>
    `).join("");
}

function completeSale() {
    if (State.cart.length === 0) {
        showToast("Agregue al menos un producto al carrito para cobrar.", "warning");
        return;
    }

    const clientName = document.getElementById("posClientInput")?.value.trim() || "Cliente Mostrador";
    const paymentMethod = document.getElementById("posPaymentSelect")?.value || "Efectivo";
    const seller = document.getElementById("posSellerSelect")?.value || "Jahir";

    for (const item of State.cart) {
        const prod = State.products.find(p => p.id === item.id);
        if (!prod || prod.stock < item.qty) {
            showToast(`Stock insuficiente para ${item.name}`, "danger");
            return;
        }
    }

    let totalCost = 0;
    let total = 0;
    const itemsSnapshot = State.cart.map(item => {
        const prod = State.products.find(p => p.id === item.id);
        prod.stock -= item.qty;
        const lineTotal = item.price * item.qty;
        const lineCost = item.cost * item.qty;
        total += lineTotal;
        totalCost += lineCost;
        return {
            id: item.id,
            name: item.name,
            category: item.category,
            price: item.price,
            cost: item.cost,
            qty: item.qty,
            total: lineTotal
        };
    });

    const ticketId = "ST-" + Math.floor(1000 + Math.random() * 9000);
    const saleRecord = {
        id: ticketId,
        date: new Date().toISOString(),
        client: clientName,
        seller: seller,
        branch: "Tienda Jalpan",
        paymentMethod: paymentMethod,
        items: itemsSnapshot,
        subtotal: Math.round(total / 1.16),
        tax: Math.round(total - (total / 1.16)),
        total: total,
        totalCost: totalCost,
        profit: total - totalCost,
        status: "Completada"
    };

    State.sales.unshift(saleRecord);
    State.saveSales();
    State.saveProducts();

    State.cart = [];
    renderCart();
    renderInventoryTable();
    renderDashboard();
    renderPOSCatalog();
    renderSalesTable();

    showToast(`Venta completada con éxito - Folio: ${ticketId}`, "success");
    openReceiptModal(saleRecord);
}

function openReceiptModal(sale) {
    const modal = document.getElementById("receiptModal");
    const container = document.getElementById("receiptPrintArea");
    if (!modal || !container) return;

    container.innerHTML = `
        <div class="receipt-box">
            <div class="receipt-header">
                <div class="receipt-logo">SUPPORTTECH</div>
                <div class="receipt-info">SOPORTE Y COMPONENTES DE ALTO RENDIMIENTO</div>
                <div class="receipt-info">Tienda Independiente - Jalpan de Serra, Qro.</div>
                <div class="receipt-info">Tel: 441-000-0000 | Atendido por: ${sale.seller}</div>
            </div>
            <div style="font-size:12px; margin-bottom:10px;">
                <div><strong>FOLIO:</strong> ${sale.id}</div>
                <div><strong>FECHA:</strong> ${new Date(sale.date).toLocaleString()}</div>
                <div><strong>CLIENTE:</strong> ${sale.client}</div>
                <div><strong>SUCURSAL:</strong> ${sale.branch}</div>
                <div><strong>MÉTODO DE PAGO:</strong> ${sale.paymentMethod}</div>
            </div>
            <table class="receipt-table">
                <thead>
                    <tr>
                        <th>CANT</th>
                        <th>DESCRIPCIÓN</th>
                        <th style="text-align:right;">P.UNIT</th>
                        <th style="text-align:right;">TOTAL</th>
                    </tr>
                </thead>
                <tbody>
                    ${sale.items.map(i => `
                        <tr>
                            <td>${i.qty}</td>
                            <td>${i.name.length > 22 ? i.name.slice(0, 22) + '...' : i.name}</td>
                            <td style="text-align:right;">$${i.price}</td>
                            <td style="text-align:right;">$${i.total}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
            <div class="receipt-totals">
                <div class="receipt-total-row"><span>SUBTOTAL:</span> <span>${formatMoney(sale.subtotal)}</span></div>
                <div class="receipt-total-row"><span>IVA (16% Incluido):</span> <span>${formatMoney(sale.tax)}</span></div>
                <div class="receipt-total-row receipt-total-grand"><span>TOTAL PAGADO:</span> <span>${formatMoney(sale.total)}</span></div>
            </div>
            <div class="receipt-footer">
                <div>¡GRACIAS POR TU COMPRA EN SUPPORTTECH!</div>
                <div>Garantía directa en nuestra tienda de Jalpan</div>
                <div style="margin-top:6px; font-size:9px;">Conserve este comprobante para cualquier garantía o aclaración.</div>
            </div>
        </div>
    `;

    modal.classList.add("active");
}

function closeReceiptModal() {
    document.getElementById("receiptModal")?.classList.remove("active");
}

function printReceipt() {
    window.print();
}

// ==========================================================
// 4. HISTORIAL DE VENTAS
// ==========================================================
function initSalesHistory() {
    const search = document.getElementById("salesHistorySearch");
    const seller = document.getElementById("salesHistorySeller");
    const method = document.getElementById("salesHistoryMethod");

    [search, seller, method].forEach(el => {
        el?.addEventListener("input", renderSalesTable);
    });

    renderSalesTable();
}

function renderSalesTable() {
    const tbody = document.getElementById("salesHistoryTableBody");
    if (!tbody) return;

    const searchTerm = document.getElementById("salesHistorySearch")?.value.toLowerCase().trim() || "";
    const selSeller = document.getElementById("salesHistorySeller")?.value || "Todos";
    const selMethod = document.getElementById("salesHistoryMethod")?.value || "Todos";

    const filtered = State.sales.filter(s => {
        const matchesSearch = s.id.toLowerCase().includes(searchTerm) || s.client.toLowerCase().includes(searchTerm);
        const matchesSeller = selSeller === "Todos" || s.seller === selSeller;
        const matchesMethod = selMethod === "Todos" || s.paymentMethod === selMethod;
        return matchesSearch && matchesSeller && matchesMethod;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:30px; color:var(--text-muted);">No se encontraron ventas en este criterio.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(s => `
        <tr>
            <td><strong style="color:var(--primary);">${s.id}</strong></td>
            <td>${new Date(s.date).toLocaleDateString()} ${new Date(s.date).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</td>
            <td><strong>${s.client}</strong></td>
            <td><span class="badge-role badge-role-seller">${s.seller}</span></td>
            <td><span style="font-size:12px; background:var(--bg-input); padding:3px 8px; border-radius:4px;">${s.paymentMethod}</span></td>
            <td><strong style="color:var(--text-title); font-size:14px;">${formatMoney(s.total)}</strong></td>
            <td>
                <div style="display:flex; gap:6px;">
                    <button class="btn btn-sm btn-secondary" onclick="viewSaleDetails('${s.id}')">Ver Recibo</button>
                    ${State.currentRole === 'ADMIN' && s.status === 'Completada' ? `<button class="btn btn-sm btn-danger btn-icon" onclick="cancelSale('${s.id}')" title="Cancelar Venta">✖</button>` : ''}
                </div>
            </td>
        </tr>
    `).join("");
}

function viewSaleDetails(saleId) {
    const sale = State.sales.find(s => s.id === saleId);
    if (sale) openReceiptModal(sale);
}

function cancelSale(saleId) {
    if (!confirm(`¿Desea cancelar la venta ${saleId}? El stock será devuelto al inventario de Jalpan.`)) return;

    const sale = State.sales.find(s => s.id === saleId);
    if (!sale) return;

    sale.items.forEach(item => {
        const prod = State.products.find(p => p.id === item.id);
        if (prod) prod.stock += item.qty;
    });

    sale.status = "Cancelada";
    State.saveSales();
    State.saveProducts();

    renderSalesTable();
    renderInventoryTable();
    renderDashboard();
    renderPOSCatalog();
    showToast(`Venta ${saleId} cancelada. Inventario restaurado.`, "info");
}

// ==========================================================
// 5. ESTADÍSTICAS Y REPORTES DE VENTA (DIARIA, SEMANAL, MENSUAL, ETC)
// ==========================================================
function initAnalytics() {
    document.querySelectorAll(".btn-period").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".btn-period").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderAnalytics();
        });
    });

    document.getElementById("analyticsSellerSelect")?.addEventListener("change", renderAnalytics);
    document.getElementById("btnExportAnalyticsCSV")?.addEventListener("click", exportAnalyticsCSV);

    renderAnalytics();
}

function getFilteredAnalyticsSales() {
    const periodBtn = document.querySelector(".btn-period.active");
    const period = periodBtn ? periodBtn.getAttribute("data-period") : "monthly";
    const selectedSeller = document.getElementById("analyticsSellerSelect")?.value || "Todos";

    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    return State.sales.filter(s => {
        if (s.status !== "Completada") return false;
        if (selectedSeller !== "Todos" && s.seller !== selectedSeller) return false;

        const saleDate = new Date(s.date);

        if (period === "daily") {
            return s.date.startsWith(todayStr);
        } else if (period === "weekly") {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(now.getDate() - 7);
            return saleDate >= sevenDaysAgo;
        } else if (period === "monthly") {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(now.getDate() - 30);
            return saleDate >= thirtyDaysAgo;
        } else if (period === "yearly") {
            return saleDate.getFullYear() === now.getFullYear();
        }

        return true;
    });
}

function renderAnalytics() {
    const filteredSales = getFilteredAnalyticsSales();

    const totalRevenue = filteredSales.reduce((acc, s) => acc + s.total, 0);
    const totalCost = filteredSales.reduce((acc, s) => acc + (s.totalCost || 0), 0);
    const totalProfit = totalRevenue - totalCost;
    const profitMargin = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : 0;
    const totalOrders = filteredSales.length;
    const avgTicket = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;

    const elRev = document.getElementById("anTotalRevenue");
    const elProf = document.getElementById("anTotalProfit");
    const elOrders = document.getElementById("anTotalOrders");
    const elAvg = document.getElementById("anAvgTicket");

    if (elRev) elRev.textContent = formatMoney(totalRevenue);
    if (elProf) elProf.textContent = `${formatMoney(totalProfit)} (${profitMargin}%)`;
    if (elOrders) elOrders.textContent = `${totalOrders} transacciones`;
    if (elAvg) elAvg.textContent = formatMoney(avgTicket);

    renderRevenueTimelineChart(filteredSales);
    renderCategoryDoughnutChart(filteredSales);
    renderPaymentMethodChart(filteredSales);
    renderTopSellersChart(filteredSales);
    renderTopProductsTable(filteredSales);
}

// Gráfico 1: Evolución Temporal
function renderRevenueTimelineChart(sales) {
    const canvas = document.getElementById("chartTimeline");
    if (!canvas || !window.Chart) return;

    const map = {};
    sales.forEach(s => {
        const d = new Date(s.date).toLocaleDateString("es-MX", { month: "short", day: "numeric" });
        map[d] = (map[d] || 0) + s.total;
    });

    const labels = Object.keys(map).length ? Object.keys(map) : ["Sin ventas en el período"];
    const data = Object.keys(map).length ? Object.values(map) : [0];

    if (State.charts.timeline) State.charts.timeline.destroy();

    State.charts.timeline = new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Ventas Totales ($ MXN)',
                data: data,
                borderColor: '#00acc1',
                backgroundColor: 'rgba(0, 172, 193, 0.15)',
                borderWidth: 3,
                fill: true,
                tension: 0.35,
                pointBackgroundColor: '#00e5ff',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#94a3b8' } }
            },
            scales: {
                x: { ticks: { color: '#94a3b8' }, grid: { color: '#28303e' } },
                y: { ticks: { color: '#94a3b8', callback: val => '$' + val.toLocaleString() }, grid: { color: '#28303e' } }
            }
        }
    });
}

// Gráfico 2: Ventas por Categoría (Doughnut)
function renderCategoryDoughnutChart(sales) {
    const canvas = document.getElementById("chartCategory");
    if (!canvas || !window.Chart) return;

    const catMap = {};
    sales.forEach(s => {
        s.items.forEach(i => {
            const cat = i.category || "Otros";
            catMap[cat] = (catMap[cat] || 0) + i.total;
        });
    });

    const labels = Object.keys(catMap);
    const data = Object.values(catMap);
    const colors = ['#00acc1', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#64748b'];

    if (State.charts.category) State.charts.category.destroy();

    State.charts.category = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: labels.length ? labels : ["Sin datos"],
            datasets: [{
                data: data.length ? data : [1],
                backgroundColor: colors.slice(0, labels.length || 1),
                borderWidth: 2,
                borderColor: '#181b22'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#94a3b8', boxWidth: 12 } }
            }
        }
    });
}

// Gráfico 3: Ventas por Método de Pago (Ideal para tienda independiente)
function renderPaymentMethodChart(sales) {
    const canvas = document.getElementById("chartBranch");
    if (!canvas || !window.Chart) return;

    const methodMap = {
        "Efectivo": 0,
        "Tarjeta": 0,
        "Transferencia SPEI": 0
    };

    sales.forEach(s => {
        if (methodMap[s.paymentMethod] !== undefined) {
            methodMap[s.paymentMethod] += s.total;
        } else {
            methodMap[s.paymentMethod] = s.total;
        }
    });

    if (State.charts.branch) State.charts.branch.destroy();

    State.charts.branch = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: Object.keys(methodMap),
            datasets: [{
                label: 'Ingresos por Forma de Pago',
                data: Object.values(methodMap),
                backgroundColor: ['#10b981', '#3b82f6', '#00acc1'],
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
                y: { ticks: { color: '#94a3b8', callback: val => '$' + val.toLocaleString() }, grid: { color: '#28303e' } }
            }
        }
    });
}

// Gráfico 4: Rendimiento por Vendedor
function renderTopSellersChart(sales) {
    const canvas = document.getElementById("chartSellers");
    if (!canvas || !window.Chart) return;

    const sellerMap = {};
    sales.forEach(s => {
        sellerMap[s.seller] = (sellerMap[s.seller] || 0) + s.total;
    });

    if (State.charts.sellers) State.charts.sellers.destroy();

    State.charts.sellers = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: Object.keys(sellerMap),
            datasets: [{
                label: 'Total Vendido',
                data: Object.values(sellerMap),
                backgroundColor: '#00acc1',
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { ticks: { color: '#94a3b8', callback: val => '$' + val.toLocaleString() }, grid: { color: '#28303e' } },
                y: { ticks: { color: '#94a3b8' }, grid: { display: false } }
            }
        }
    });
}

// Tabla de Productos Top
function renderTopProductsTable(sales) {
    const tbody = document.getElementById("anTopProductsTable");
    if (!tbody) return;

    const prodMap = {};
    sales.forEach(s => {
        s.items.forEach(i => {
            if (!prodMap[i.id]) {
                prodMap[i.id] = { name: i.name, units: 0, revenue: 0, category: i.category };
            }
            prodMap[i.id].units += i.qty;
            prodMap[i.id].revenue += i.total;
        });
    });

    const sorted = Object.values(prodMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

    if (sorted.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:20px; color:var(--text-muted);">Sin productos vendidos en este período.</td></tr>`;
        return;
    }

    tbody.innerHTML = sorted.map((p, idx) => `
        <tr>
            <td><strong style="color:var(--primary-light);">#${idx + 1}</strong> ${p.name}</td>
            <td>${p.category || '-'}</td>
            <td><strong>${p.units} pzas</strong></td>
            <td><strong>${formatMoney(p.revenue)}</strong></td>
        </tr>
    `).join("");
}

function exportAnalyticsCSV() {
    const sales = getFilteredAnalyticsSales();
    let csv = "Folio,Fecha,Cliente,Vendedor,Sucursal,MetodoPago,Subtotal,IVA,Total,GananciaEstimada\n";
    sales.forEach(s => {
        csv += `"${s.id}","${s.date}","${s.client}","${s.seller}","Tienda Jalpan","${s.paymentMethod}",${s.subtotal},${s.tax},${s.total},${s.profit}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte_Ventas_SupportTech_Jalpan_${new Date().toISOString().slice(0,10)}.csv`;
    link.click();
    showToast("Reporte de ventas exportado en CSV", "success");
}

// ==========================================================
// 6. GESTIÓN DE PERFILES Y USUARIOS
// ==========================================================
function initUsers() {
    document.getElementById("btnNewUser")?.addEventListener("click", () => openUserModal());
    document.getElementById("formUserModal")?.addEventListener("submit", (e) => {
        e.preventDefault();
        saveUserFromModal();
    });

    renderUsersTable();
}

function renderUsersTable() {
    const tbody = document.getElementById("usersTableBody");
    if (!tbody) return;

    tbody.innerHTML = State.users.map(u => {
        let roleBadge = `badge-role-admin`;
        if (u.role === "VENDEDOR") roleBadge = `badge-role-seller`;

        return `
            <tr>
                <td>
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div class="user-avatar" style="width:36px; height:36px;">${u.avatar}</div>
                        <div>
                            <div style="font-weight:700; color:var(--text-title);">${u.name}</div>
                            <div style="font-size:12px; color:var(--text-muted);">${u.email}</div>
                        </div>
                    </div>
                </td>
                <td><span class="badge-role ${roleBadge}">${u.role}</span></td>
                <td>${u.branch}</td>
                <td><span class="badge-status badge-instock">${u.status}</span></td>
                <td><span style="font-size:12px; color:var(--text-muted);">${u.lastLogin}</span></td>
                <td>
                    <button class="btn btn-sm btn-secondary" onclick="simulateRoleSwitch('${u.role}')">Probar Rol</button>
                </td>
            </tr>
        `;
    }).join("");
}

function simulateRoleSwitch(role) {
    const roleSelect = document.getElementById("headerRoleSelect");
    if (roleSelect) {
        roleSelect.value = role;
        State.saveRole(role);
        applyRolePermissions();
        showToast(`Sesión cambiada a perfil: ${role}`, "info");
    }
}

function openUserModal() {
    const modal = document.getElementById("userModal");
    document.getElementById("formUserModal")?.reset();
    modal?.classList.add("active");
}

function closeUserModal() {
    document.getElementById("userModal")?.classList.remove("active");
}

function saveUserFromModal() {
    const name = document.getElementById("modalUserName").value.trim();
    const email = document.getElementById("modalUserEmail").value.trim();
    const role = document.getElementById("modalUserRole").value;

    if (!name || !email) {
        showToast("Nombre y correo son requeridos", "warning");
        return;
    }

    const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

    const newUser = {
        id: "USR-" + Date.now().toString().slice(-4),
        name,
        email,
        role,
        branch: "Tienda Jalpan",
        status: "Activo",
        lastLogin: "Nuevo",
        avatar: initials
    };

    State.users.push(newUser);
    State.saveUsers();
    closeUserModal();
    renderUsersTable();
    showToast(`Usuario ${name} registrado con rol ${role}`, "success");
}
