<template>

  <h1>ahahhahah</h1>

  <h1>{{ result }}</h1>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const accessId = route.params.apikey
const result = ref(null)

function parseTimeToDate(timeStr) {
const now = new Date()
const [hours, minutes] = timeStr.split(':').map(Number)
return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)
}

function isWithinRange(now, time, minusMinutes, plusMinutes) {
const lower = new Date(time.getTime() - minusMinutes * 60000)
const upper = new Date(time.getTime() + plusMinutes * 60000)
return now >= lower && now <= upper
}

onMounted(() => {
if (!accessId) {
  result.value = "API KEY MISSING"
  return
}

const stationId = "000220201021"
const url = `https://cdt.hafas.de/opendata/apiserver/departureBoard?accessId=${accessId}&id=${stationId}&format=json&maxJourney=1`

fetch(url)
  .then(res => res.json())
  .then(data => {
    const now = new Date()
    const deps = data.Departure?.slice(0, 2) || []

    let canPass = true

    for (const dep of deps) {
      const timeStr = dep.rtTime || dep.time
      const track = dep.rtTrack
      if (!timeStr || !track) continue

      const depTime = parseTimeToDate(timeStr)

      if (track === "1" && isWithinRange(now, depTime, 3, 3)) {
        canPass = false
        break
      }

      if (track === "2" && isWithinRange(now, depTime, 3, 0)) {
        canPass = false
        break
      }
    }

    result.value = canPass.toString()
  })
  .catch(() => {
    result.value = "ERROR"
  })
})
</script>

<style scoped>
.result-container {
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
}
h1 {
font-size: 4rem;
font-weight: bold;
}
</style>