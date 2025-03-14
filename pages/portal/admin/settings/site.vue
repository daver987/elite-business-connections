<script setup lang="ts">
definePageMeta({
  layout: 'portal',
})

const siteSettings = reactive({
  siteName: 'Elite Business Connections',
  siteDescription:
    'A premier network for business professionals to connect and grow together.',
  contactEmail: 'info@elitebusinessconnections.com',
  maintenanceMode: false,
  allowNewRegistrations: true,
  memberApprovalRequired: true,
  meetingFrequency: 'weekly',
  feedbackEmail: 'feedback@elitebusinessconnections.com',
})

const links = [
  [
    {
      label: 'Dashboard',
      icon: 'i-heroicons-home',
      to: '/portal/admin',
      exact: true,
    },
    {
      label: 'All Members',
      icon: 'i-heroicons-users',
      to: '/portal/admin/members',
    },
    {
      label: 'Site Settings',
      icon: 'i-heroicons-cog-6-tooth',
      to: '/portal/admin/site',
    },
  ],
]

const saveSettings = () => {
  // Would typically make an API call to save settings
  // For now, just show a success message
  // Placeholder for saving site settings
}
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Site Settings">
        <template #right>
          <div class="flex items-center gap-2">
            <UButton
              icon="i-heroicons-check"
              label="Save Changes"
              color="primary"
              @click="saveSettings"
            />
          </div>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar class="py-0 px-1.5 overflow-x-auto">
        <UHorizontalNavigation :links="links" />
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <UContainer class="p-4">
          <UCard>
            <UForm :state="siteSettings">
              <UDashboardSection
                title="General Settings"
                description="Basic site configuration"
              >
                <UFormGroup label="Site Name" name="siteName">
                  <UInput v-model="siteSettings.siteName" />
                </UFormGroup>
                <UFormGroup label="Site Description" name="siteDescription">
                  <UTextarea v-model="siteSettings.siteDescription" :rows="3" />
                </UFormGroup>
                <UFormGroup label="Contact Email" name="contactEmail">
                  <UInput v-model="siteSettings.contactEmail" type="email" />
                </UFormGroup>
                <UFormGroup label="Feedback Email" name="feedbackEmail">
                  <UInput v-model="siteSettings.feedbackEmail" type="email" />
                </UFormGroup>
              </UDashboardSection>

              <UDivider class="my-6" />

              <UDashboardSection
                title="Membership Settings"
                description="Control member registration and access"
              >
                <UFormGroup
                  label="Allow New Registrations"
                  name="allowNewRegistrations"
                >
                  <UToggle v-model="siteSettings.allowNewRegistrations" />
                </UFormGroup>
                <UFormGroup
                  label="Member Approval Required"
                  name="memberApprovalRequired"
                >
                  <UToggle v-model="siteSettings.memberApprovalRequired" />
                </UFormGroup>
                <UFormGroup label="Meeting Frequency" name="meetingFrequency">
                  <USelect
                    v-model="siteSettings.meetingFrequency"
                    :options="['weekly', 'bi-weekly', 'monthly']"
                  />
                </UFormGroup>
              </UDashboardSection>

              <UDivider class="my-6" />

              <UDashboardSection
                title="Maintenance"
                description="Site maintenance options"
              >
                <UFormGroup label="Maintenance Mode" name="maintenanceMode">
                  <UToggle v-model="siteSettings.maintenanceMode" />
                </UFormGroup>
                <UAlert
                  class="mt-4"
                  v-if="siteSettings.maintenanceMode"
                  icon="i-heroicons-exclamation-triangle"
                  color="yellow"
                  title="Maintenance Mode Enabled"
                  description="When maintenance mode is enabled, only administrators can access the site."
                />
              </UDashboardSection>
            </UForm>
          </UCard>
        </UContainer>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
