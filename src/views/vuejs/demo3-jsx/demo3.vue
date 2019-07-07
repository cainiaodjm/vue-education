<template>
  <div>
    <Card>
      <div>JSX</div>
      <Table :data="tableData" :columns="tableColumns" stripe></Table>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      tableColumns: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Status",
          key: "status",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.status === 1
                ? "primary"
                : row.status === 2
                ? "success"
                : "error";
            const text =
              row.status === 1
                ? "Working"
                : row.status === 2
                ? "Success"
                : "Fail";
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "Portrayal",
          key: "portrayal",
          render: (h, params) => {
            const row = params.row;
            const count = row.portrayal.length;
            return h("Poptip", {
              props: {
                tirgger: "hover",
                title: params.row.portrayal.length + "portrayals",
                placement: "bottom"
              }
            });
          }
        },
        {
          title: "People",
          key: "people"
        },
        {
          title: "Sampling Time",
          key: "time"
        },
        {
          title: "Updated Time",
          key: "update"
        }
      ]
    };
  },
  methods: {
    mockTableData() {
      let data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          name: "Business" + Math.floor(Math.random() * 100 + 1),
          status: Math.floor(Math.random() * 3 + 1),
          portrayal: ["City", "People", "Cost", "Life", "Entertainment"],
          people: [
            {
              n: "People" + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: "People" + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            },
            {
              n: "People" + Math.floor(Math.random() * 100 + 1),
              c: Math.floor(Math.random() * 1000000 + 100000)
            }
          ],
          time: Math.floor(Math.random() * 7 + 1),
          update: new Date()
        });
      }
      return data;
    }
  },
  mounted() {
    this.tableData = this.mockTableData();
  }
};
</script>
<style lang="less">
</style>
