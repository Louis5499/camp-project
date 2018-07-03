<template>
  <el-table
    :data="teamsData"
    style="width: 80%; background: #2c3e50;"
    :header-cell-class-name="headerRowCalc"
    :row-class-name="tableRowClassName"
    align="center"
    :default-sort="{prop: 'money', order: 'descending'}"
    >
    <el-table-column
      prop="curRank"
      label="名次"
      width="50">
    </el-table-column>
    <el-table-column
      prop="team"
      label="組別"
      width="90">
    </el-table-column>
    <el-table-column
      prop="money"
      label="金錢"
      width="120">
    </el-table-column>
    <el-table-column
      prop="usedCardNum"
      label="卡牌使用次數"
      width="120">
    </el-table-column>
    <el-table-column
      prop="atkTimes"
      label="攻擊"
      width="90">
    </el-table-column>
    <el-table-column
      prop="defTimes"
      label="防禦"
      width="90">
    </el-table-column>
    <el-table-column
      prop="spTimes"
      label="加錢"
      width="90">
    </el-table-column>
    <el-table-column
      prop="lastRank"
      label="上次名次">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    teamsData() {
      let arr = this.$store.state.teams;
      return arr;
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'row warning-row';
      } else if (rowIndex === 3) {
        return 'row success-row';
      }
      return 'row';
    },
    headerRowCalc({row,rowIndex}) {
      return 'headerRow';
    }
  },
}
</script>

<style lang="scss">
.el-table {
  position: absolute;
  top: 50%;
  transform: translateY(-40%);
}
.el-table .row {
  background-color: #2c3e50;
  color: white;
}
.el-table .headerRow {
  background-color: #2c3e50;
  color: white;
}
.el-table .warning-row {
  background: #f85f73;
}
.el-table .success-row {
  background: #4bbb8b;
}
.el-table__body tr.current-row>td {
  background-color: #2c3e50;
}
.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: #2c3e50;
}
</style>
