<script setup lang="ts">
import { ref, computed } from "vue";
import { useProductStore } from "@/stores/product.store";
import type { Product, CategoryType } from "@/types/Product";

const productStore = useProductStore();

// Search and Category Filter State
const searchQuery = ref("");
const selectedCategory = ref<string>("all");

// Modal State for Add/Edit
const isModalOpen = ref(false);
const isEditing = ref(false);

// Professional Delete Modal State
const isDeleteModalOpen = ref(false);
const productToDeleteId = ref<string | number | null>(null);

// Form State matching Product types
const formProduct = ref({
  id: "",
  name: "",
  price: 0,
  image: "",
  category: "face" as CategoryType,
  subcategory: "",
  description: "",
  isClearStock: false,
  isNewArrival: false,
  isBestSeller: false,
  shades: [] as Array<{ id: string; name: string; colorCode: string }>,
});

// Temporary inputs for the Shade Builder inside the modal
const tempShadeId = ref("");
const tempShadeName = ref("");
const tempColorCode = ref("#ee5b88");

const addShade = () => {
  if (!tempShadeName.value) return;
  formProduct.value.shades.push({
    id:
      tempShadeId.value ||
      String(formProduct.value.shades.length + 1).padStart(2, "0"),
    name: tempShadeName.value,
    colorCode: tempColorCode.value,
  });
  tempShadeId.value = "";
  tempShadeName.value = "";
  tempColorCode.value = "#ee5b88";
};

const removeShade = (index: number) => {
  formProduct.value.shades.splice(index, 1);
};

// Handle local disk image selection & convert to Base64 for permanent storage
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64String = e.target?.result as string;
      formProduct.value.image = base64String;
    };

    reader.readAsDataURL(file);
  }
};

// Category options matching CategoryType exact union
const categories: { label: string; value: CategoryType }[] = [
  { label: "Eyes", value: "eyes" },
  { label: "Lips", value: "lips" },
  { label: "Cheeks", value: "cheeks" },
  { label: "Face", value: "face" },
  { label: "Others", value: "others" },
];

// Computed Filtered Products
const filteredProducts = computed(() => {
  return productStore.products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesCategory =
      selectedCategory.value === "all" ||
      product.category === selectedCategory.value;

    return matchesSearch && matchesCategory;
  });
});

// Open Modal to Add
const openAddModal = () => {
  isEditing.value = false;
  formProduct.value = {
    id: "",
    name: "",
    price: 0,
    image: "",
    category: "face",
    subcategory: "",
    description: "",
    isClearStock: false,
    isNewArrival: false,
    isBestSeller: false,
    shades: [],
  };
  tempShadeId.value = "";
  tempShadeName.value = "";
  tempColorCode.value = "#ee5b88";
  isModalOpen.value = true;
};

// Open Modal to Edit
const openEditModal = (product: Product) => {
  isEditing.value = true;

  let existingShades: Array<{ id: string; name: string; colorCode: string }> =
    [];
  if (Array.isArray((product as any).shades)) {
    existingShades = JSON.parse(JSON.stringify((product as any).shades));
  }

  formProduct.value = {
    id: String(product.id),
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category,
    subcategory: product.subcategory || "",
    description: product.description || "",
    isClearStock: Boolean(product.isClearStock),
    isNewArrival: Boolean((product as any).isNewArrival),
    isBestSeller: Boolean((product as any).isBestSeller),
    shades: existingShades,
  };

  tempShadeId.value = "";
  tempShadeName.value = "";
  tempColorCode.value = "#ee5b88";
  isModalOpen.value = true;
};

// Handle Form Submission
const handleSubmit = () => {
  if (!formProduct.value.name || formProduct.value.price <= 0) return;

  const payload = {
    id: formProduct.value.id,
    name: formProduct.value.name,
    price: formProduct.value.price,
    image: formProduct.value.image || "/images/products/contour.jpg",
    category: formProduct.value.category,
    subcategory: formProduct.value.subcategory,
    description: formProduct.value.description,
    isClearStock: formProduct.value.isClearStock,
    isNewArrival: formProduct.value.isNewArrival,
    isBestSeller: formProduct.value.isBestSeller,
    shades: formProduct.value.shades,
  };

  if (isEditing.value) {
    productStore.updateProduct(payload as any);
  } else {
    productStore.addProduct(payload as any);
  }

  isModalOpen.value = false;
};

// Toggle stock clearance using isClearStock
const toggleClearStock = (product: Product) => {
  productStore.updateProduct({
    ...product,
    isClearStock: !product.isClearStock,
  });
};

// Trigger Professional Delete Modal
const promptDelete = (id: string | number) => {
  productToDeleteId.value = id;
  isDeleteModalOpen.value = true;
};

// Confirm and Execute Deletion
const confirmDelete = () => {
  if (productToDeleteId.value !== null) {
    productStore.deleteProduct(productToDeleteId.value);
    isDeleteModalOpen.value = false;
    productToDeleteId.value = null;
  }
};
</script>

<template>
  <div class="management-container">
    <div class="header-actions">
      <h2>Product Management</h2>

      <div class="header-controls">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search products..."
          class="search-input"
        />
        <select v-model="selectedCategory" class="filter-select">
          <option value="all">All Categories</option>
          <option v-for="cat in categories" :key="cat.value" :value="cat.value">
            {{ cat.label }}
          </option>
        </select>
        <button class="primary-btn" @click="openAddModal">
          + Add New Product
        </button>
      </div>
    </div>

    <!-- Products Table -->
    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Price</th>
            <th>Clearance Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td class="product-cell">
              <img :src="product.image" :alt="product.name" class="thumb-img" />
              <span>{{ product.name }}</span>
            </td>
            <td class="category-tag">{{ product.category }}</td>
            <td>{{ product.subcategory || "-" }}</td>
            <td>${{ Number(product.price).toFixed(2) }}</td>
            <td>
              <span
                :class="[
                  'status-badge',
                  product.isClearStock ? 'clearance' : 'regular',
                ]"
              >
                {{ product.isClearStock ? "Clear Stock" : "Regular Stock" }}
              </span>
            </td>
            <td class="action-cell">
              <button class="action-btn edit" @click="openEditModal(product)">
                Edit
              </button>
              <button class="action-btn" @click="toggleClearStock(product)">
                Toggle Clear
              </button>
              <button
                class="action-btn delete"
                @click="promptDelete(product.id)"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="filteredProducts.length === 0">
            <td colspan="6" class="empty-state">No products found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Product Modal -->
    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="modal-overlay"
        @click.self="isModalOpen = false"
      >
        <div class="modal-card">
          <h3>{{ isEditing ? "Edit Product" : "Add New Product" }}</h3>
          <form @submit.prevent="handleSubmit" class="modal-form">
            <div class="form-group">
              <label>Product Name</label>
              <input
                v-model="formProduct.name"
                type="text"
                required
                placeholder="Product name..."
              />
            </div>

            <div class="form-group">
              <label>Category</label>
              <select v-model="formProduct.category">
                <option
                  v-for="cat in categories"
                  :key="cat.value"
                  :value="cat.value"
                >
                  {{ cat.label }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label>Subcategory</label>
              <input
                v-model="formProduct.subcategory"
                type="text"
                placeholder="e.g. Lip Gloss, Contour"
              />
            </div>

            <div class="form-group">
              <label>Price ($)</label>
              <input
                v-model.number="formProduct.price"
                type="number"
                step="0.01"
                required
                placeholder="0.00"
              />
            </div>

            <!-- Interactive Shade & Color Picker Builder -->
            <div class="form-group">
              <label>Shades & Colors</label>
              <div class="shade-builder-row">
                <input
                  type="text"
                  v-model="tempShadeId"
                  placeholder="ID (01)"
                  class="shade-id-box"
                />
                <input
                  type="text"
                  v-model="tempShadeName"
                  placeholder="Shade Name (Soft Warm)"
                  class="shade-name-box"
                />
                <input
                  type="color"
                  v-model="tempColorCode"
                  class="color-picker-box"
                  title="Pick shade color"
                />
                <button type="button" @click="addShade" class="add-shade-btn">
                  + Add
                </button>
              </div>

              <div
                class="shades-preview-list"
                v-if="formProduct.shades.length > 0"
              >
                <div
                  v-for="(shade, idx) in formProduct.shades"
                  :key="idx"
                  class="shade-chip"
                >
                  <span
                    class="chip-color-dot"
                    :style="{ backgroundColor: shade.colorCode }"
                  ></span>
                  <span class="chip-text"
                    >#{{ shade.id }} {{ shade.name }}</span
                  >
                  <button
                    type="button"
                    @click="removeShade(idx)"
                    class="chip-remove"
                  >
                    &times;
                  </button>
                </div>
              </div>
            </div>

            <!-- Local Disk Image Picker -->
            <div class="form-group">
              <label>Product Image</label>
              <div class="image-upload-wrapper">
                <input
                  type="file"
                  accept="image/*"
                  @change="handleImageUpload"
                  class="file-input-box"
                />
                <div v-if="formProduct.image" class="image-preview-container">
                  <img
                    :src="formProduct.image"
                    alt="Preview"
                    class="thumbnail-preview"
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Description</label>
              <textarea
                v-model="formProduct.description"
                rows="2"
                placeholder="Short product overview..."
              ></textarea>
            </div>

            <!-- Badges / Flags Checkboxes -->
            <div class="form-group checkbox-group">
              <label>
                <input type="checkbox" v-model="formProduct.isClearStock" />
                Mark as Clear Stock / Clearance Item
              </label>
            </div>

            <div class="form-group checkbox-group">
              <label>
                <input type="checkbox" v-model="formProduct.isNewArrival" />
                Mark as New Arrival
              </label>
            </div>

            <div class="form-group checkbox-group">
              <label>
                <input type="checkbox" v-model="formProduct.isBestSeller" />
                Mark as Best Seller
              </label>
            </div>

            <div class="modal-actions">
              <button
                type="button"
                class="cancel-btn"
                @click="isModalOpen = false"
              >
                Cancel
              </button>
              <button type="submit" class="primary-btn">
                {{ isEditing ? "Save Changes" : "Save Product" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Professional Custom Delete Confirmation Modal -->
    <Teleport to="body">
      <div
        v-if="isDeleteModalOpen"
        class="modal-overlay"
        @click.self="isDeleteModalOpen = false"
      >
        <div class="delete-modal-card">
          <div class="delete-icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </div>
          <h3>Are you sure?</h3>
          <p>
            Do you really want to delete this product? This action cannot be
            undone.
          </p>
          <div class="delete-modal-actions">
            <button
              type="button"
              class="cancel-btn"
              @click="isDeleteModalOpen = false"
            >
              Cancel
            </button>
            <button
              type="button"
              class="confirm-delete-btn"
              @click="confirmDelete"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.management-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.header-actions h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
  margin: 0;
}

.header-controls {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.search-input,
.filter-select {
  padding: 0.55rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  outline: none;
  font-size: 0.875rem;
}

.search-input {
  width: 200px;
}

.primary-btn {
  background-color: #ff5b93;
  color: #fff;
  border: none;
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.primary-btn:hover {
  background-color: #e04a7e;
}

.table-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eef2f5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.data-table th,
.data-table td {
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.data-table th {
  background-color: #fafafa;
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-weight: 600;
}

.category-tag {
  text-transform: capitalize;
  color: #555;
}

.thumb-img {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  object-fit: cover;
  background-color: #f8f8f8;
}

.status-badge {
  padding: 0.25rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.clearance {
  background-color: #fee2e2;
  color: #ef4444;
}

.regular {
  background-color: #e6f9f0;
  color: #10b981;
}

.action-cell {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.4rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.action-btn.edit {
  color: #4f46e5;
  border-color: #c7d2fe;
  background-color: #eef2ff;
}

.action-btn.delete {
  color: #ef4444;
  border-color: #fca5a5;
  background-color: #fef2f2;
}

.empty-state {
  text-align: center;
  color: #94a3b8;
  padding: 2rem 1rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  backdrop-filter: blur(2px);
}

.modal-card {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 440px;
  max-height: 90vh;
  overflow-y: auto;
}

.delete-modal-card {
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  width: 100%;
  max-width: 380px;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.delete-icon-wrapper {
  width: 52px;
  height: 52px;
  background-color: #fef2f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}

.delete-modal-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111;
  margin-bottom: 0.5rem;
}

.delete-modal-card p {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.delete-modal-actions {
  display: flex;
  gap: 0.75rem;
}

.delete-modal-actions button {
  flex: 1;
}

.confirm-delete-btn {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.confirm-delete-btn:hover {
  background-color: #dc2626;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  margin-top: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.88rem;
  font-weight: 500;
}

.form-group label {
  font-size: 0.88rem;
  font-weight: 600;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select,
.form-group textarea {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  font-family: inherit;
}

/* Shade Builder Styles */
.shade-builder-row {
  display: flex;
  gap: 6px;
  align-items: center;
}

.shade-id-box {
  width: 65px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.85rem;
}

.shade-name-box {
  flex: 1;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.85rem;
}

.color-picker-box {
  width: 38px;
  height: 36px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: none;
  cursor: pointer;
  padding: 2px;
}

.add-shade-btn {
  background-color: #ff5b93;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
}

.add-shade-btn:hover {
  background-color: #e04a7e;
}

.shades-preview-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.shade-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #fdf2f4;
  border: 1px solid #f9d5e0;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #333;
}

.chip-color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.chip-remove {
  background: none;
  border: none;
  font-size: 1rem;
  color: #ff5b93;
  cursor: pointer;
  padding: 0 2px;
  line-height: 1;
}

.chip-remove:hover {
  color: #ef4444;
}

/* Image Upload Styles */
.image-upload-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.file-input-box {
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fafafa;
  font-size: 0.85rem;
  cursor: pointer;
}

.image-preview-container {
  width: 60px;
  height: 60px;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f9f9f9;
}

.thumbnail-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}

.cancel-btn {
  background: transparent;
  border: 1px solid #d1d5db;
  color: #374151;
  padding: 0.65rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.cancel-btn:hover {
  background-color: #f3f4f6;
}
</style>
