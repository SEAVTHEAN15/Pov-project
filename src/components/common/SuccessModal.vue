<script setup lang="ts">
defineProps<{
  isOpen: boolean
  title?: string
  message?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="modal-overlay" @click.self="emit('close')">
      <div class="modal-card">
        <div class="icon-container">✓</div>
        <h2>{{ title || 'ជោគជ័យ!' }}</h2>
        <p>{{ message || 'ការទូទាត់ប្រាក់ជោគជ័យ! អរគុណសម្រាប់ការជាវរបស់អ្នក។' }}</p>
        <button class="btn-ok" @click="emit('close')">យល់ព្រម</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-card {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.icon-container {
  width: 50px;
  height: 50px;
  background-color: #e6f4ea;
  color: #137333;
  font-size: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}

.btn-ok {
  background-color: #7a3b4e;
  color: white;
  border: none;
  padding: 0.6rem 2rem;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1.5rem;
}

.btn-ok:hover {
  opacity: 0.9;
}
</style>