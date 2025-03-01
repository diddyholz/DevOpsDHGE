<script setup>
    import { Modal } from 'bootstrap';

    defineProps(['size']);

    // Generate a random id, so that none of the modals have the same id
    const modalId = Math.random().toString(36).substring(7);
    let bsModal = null;

    function show() {
        if (!bsModal) {
            bsModal = new Modal(document.getElementById(modalId), {
                keyboard: false
            });
        }

        bsModal.show();
    }

    function hide() {
        if (!bsModal) {
            return;
        }

        bsModal.hide();
    }

    defineExpose({ show, hide });
</script>

<template>
    <div class="modal fade" :id="modalId" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" >
        <div class="modal-dialog" :class="'modal-' + size">
            <div class="modal-content">
                <div class="modal-header">
                    <slot name="header"></slot>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                    <button 
                        v-if="$slots.failure" 
                        type="button" 
                        class="btn btn-danger"
                        @click="$emit('failure')">
                        <slot name="failure"></slot>
                    </button>
                    <button 
                        v-if="$slots.success" 
                        type="button" 
                        class="btn btn-primary"
                        @click="$emit('success')">
                        <slot name="success"></slot>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>