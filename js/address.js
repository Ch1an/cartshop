new Vue({
  el:".address",
  data:{
    limitNum:3,
    currentIndex:0,
    addressList:[]
  },
  computed:{
    filterAddress(){
      return this.addressList.slice(0,this.limitNum);
    }
  },
  methods:{
    getAddressList () {
      this.$http.get("./data/address.json").then((res)=>{
        console.log(res);
        this.addressList = res.data.result; 
      })
    },
    setDefault(address){
      this.addressList.forEach(ele => {
        if(ele.isDefault){
          ele.isDefault = false;
        }
      });
      address.isDefault = true;
    }
  },
  mounted(){
    this.$nextTick(() => {
      this.getAddressList();
    })
  }
})