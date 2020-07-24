
export const publicData = {

  pickerOptions2:{
            shortcuts: [{
              text: '今天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 0);
                picker.$emit('pick', [start, end]);
              }
            },{
              text: '最近三天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
                picker.$emit('pick', [start, end]);
              }
            },{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 6);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 29);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 89);
                picker.$emit('pick', [start, end]);
              }
            }]
  },
  pickerOptions3: {
    shortcuts: [{
      text: '本月',
      onClick(picker) {
        picker.$emit('pick', [new Date(), new Date()]);
      }
    }, {
      text: '今年至今',
      onClick(picker) {
        const end = new Date();
        const start = new Date(new Date().getFullYear(), 0);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近六个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 6);
        picker.$emit('pick', [start, end]);
      }
    }]
  },
}
