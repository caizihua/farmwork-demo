<template>
  <div>
    <v-row class="d-flex justify-center align-center">
      <v-col id="pct_emr_field" :cols="2">
        <v-text-field
          outlined
          v-model="value"
          @keydown.enter="submit"
          label="病人id"
          required
          hide-details
        ></v-text-field>
      </v-col>
      <v-col id="pct_emr_submit" :cols="1">
        <div class="d-flex">
          <v-btn class="mr-4" @click="submit" color="primary"> submit</v-btn>
          <v-btn id="pctSubmit" class="mr-4" @click="check" color="primary" outlined> check</v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 'test_patient_id_001'
    }
  },
  methods: {
    submit () {
      this.send()
    },
    check () {},
    send () {},
    mounted () {},
    destroyed () {}
  }
}
</script>
