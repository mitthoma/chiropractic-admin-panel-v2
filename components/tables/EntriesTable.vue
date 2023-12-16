<template>
  <v-table>
    <thead>
      <tr>
        <th v-if="!extremityTable" class="text-left">Region</th>
        <th class="text-left">Level</th>
        <th class="text-left">Side</th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td v-if="!extremityTable">{{ getRegionTitle(item.region) }}</td>
        <td v-if="item.category === 'spinal'">
          {{ getSpinalLevelTitle(item.spinalLevel) }}
        </td>
        <td v-else>{{ getExtremityLevelTitle(item.extremityLevel) }}</td>
        <td>{{ getSideTitle(item.side) }}</td>

        <td class="d-flex justify-end">
          <v-icon
            class="ma-2 pa-2 pencil-edit"
            @click="$emit('edit-item', item)"
            >mdi-pencil</v-icon
          >
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import {
  sides,
  extremityLevels,
  spinalLevels,
  spinalRegions,
} from "../helper.js";

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    extremityTable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    getSideTitle(value) {
      const side = sides.find((s) => s.value === value);
      return side ? side.title : value;
    },
    getExtremityLevelTitle(value) {
      const level = extremityLevels.find((l) => l.value === value);
      return level ? level.title : value;
    },
    getSpinalLevelTitle(value) {
      const level = spinalLevels.find((l) => l.value === value);
      return level ? level.title : value;
    },
    getRegionTitle(value) {
      const region = spinalRegions.find((r) => r.value === value);
      return region ? region.title : value;
    },
  },
};
</script>
