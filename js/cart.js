var app = new Vue({
  el:"#app",
  data:{
    totalMoney:0,
    checkAllFlag:false,
    delFlag:false,
    _index:'',
    productList:[]
  },
  filters: {
    formatMoney:function (val) {
      return "￥"+val.toFixed(2)
    }
  },
  methods:{
    cartView(){
      var _this = this;
      this.$http.get("./data/cart.json",{"id":123})
      .then(function (res) {
        console.log(res);
        _this.productList = res.data.result.list;
      })
    },
    changeMoney(product,way){
      if(way>0){
        product.count++;
      }else{
        product.count--;
        if(product.count<1){
          product.count = 1;
        }
      }
      this.calcTotalPrice();
    },
    productSelect(item){
      if(typeof item.checked == 'undefined'){
        Vue.set(item,"checked",true);
        //this.$set(item,"checked",true);
      }else{
        item.checked = !item.checked;
      }
      this.calcTotalPrice();
      this.autoCheckAll();
    },
    checkAll(type){
      this.checkAllFlag = type;
      this.productList.forEach(function (value,index) {
        if(typeof value.checked == 'undefined'){
          Vue.set(value,"checked",type);
        }else{
          value.checked = type;
        }
      })
    },
    calcTotalPrice(){
      this.totalMoney = 0;
      this.productList.forEach((value,index)=> {
        if(value.checked){
          this.totalMoney += value.price*value.count;
        }
      })
    },
    //当所有列表勾选上了，那么自动勾选全选按钮
    autoCheckAll(){
      var flag = this.productList.every(value=>value.checked == true);
      if(flag){
        this.checkAllFlag = flag;
      }

    },
    changeDelFlag(index){
      this.delFlag = true;
      this._index = index;
    },
    del(){
      this.productList = this.productList.filter(value=>value.price != this.productList[this._index].price);
      this.delFlag = false;
    }
  },
  mounted(){
    this.cartView();
  }
})