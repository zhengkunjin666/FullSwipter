// const PAGE={
//     data: {
//         index: 0,
//         duration: 500,
//         isLock: false,
//         translateX: 0,
//         defaultLength: null,
//         itemWidth: null,
//     },
//     init: function(){
//         this.bind();
//         this.clone();
//     },
//     bind: function(){
//         let swiperPrev=document.getElementById('swiper-prev');
//         swiperPrev.addEventListener('click',this.swiperPrev);
//         let swiperNext=document.getElementById('swiper-next');
//         swiperNext.addEventListener('click',this.swiperNext);
//         let swiperSwitch=document.getElementsByClassName('swiper-pagination-switch');
//         for(i=0;i<swiperSwitch.length;i++){
//             swiperSwitch[i].setAttribute('data-index',i);
//             swiperSwitch[i].addEventListener('click',this.swiperSwitch);
//         };
//         window.addEventListener('resize',this.swiperReset);
//     },
//     clone: function(){
//         let swiperItem=document.getElementsByClassName('swiper-item');
//         let firstItem=swiperItem[0].cloneNode();
//         let lastItem=swiperItem[swiperItem.length-1].cloneNode();
//         let swiperList=document.getElementById('swiper-list');
//         let index=PAGE.data.index;
//         let swiperItemWidth=swiperList.offsetWidth;
//         PAGE.data.itemWidth=swiperItemWidth;
//         PAGE.data.translateX=-(swiperItemWidth + swiperItemWidth*index);
//         PAGE.data.defaultLength=swiperItem.length;
//         swiperList.appendChild(firstItem);
//         swiperList.prepend(lastItem);
//         PAGE.goIndex(index);
//     },
//     animateTo: function(begin,end,duration,changeCallback,finishCallback){
//         let startTime=Date.now();
//         requestAnimationFrame(function update(){
//             let dataNow=Date.now();
//             let time=dataNow-startTime;
//             let value=PAGE.linear(time,begin,end,duration);
//             typeof changeCallback === 'function' && changeCallback(value);
//             if(startTime+duration > dataNow){
//                 requestAnimationFrame(update);
//             }else{
//                 typeof finishCallback === 'function'  && finishCallback(end);
//             }
//         })
//     },
//     linear: function(time,begin,end,duration){
//         return (end-begin) * time / duration + begin;
//     },
//     goIndex: function(index){
//         let swiperDuration=PAGE.data.duration;
//         let swiperItemWidth=PAGE.data.itemWidth;
//         let beginTranslateX=PAGE.data.translateX;
//         let endTranslateX=-(swiperItemWidth + swiperItemWidth*index);
//         if(PAGE.data.isLock){
//             return
//         }else{
//             PAGE.data.isLock=true;
//         };
//         let swiperList=document.getElementById('swiper-list');
//         PAGE.animateTo(beginTranslateX,endTranslateX,swiperDuration,function(value){
//             swiperList.style.transform=`translateX(${value}px)`;
//         },function(value){
//             let swiperLength=PAGE.data.defaultLength;
//             if(index === -1){
//                 index=swiperLength-1;
//                 value=-(swiperItemWidth + swiperItemWidth*index);
//             };
//             if(index === swiperLength){
//                 index=0;
//                 value=-(swiperItemWidth + swiperItemWidth*index);
//             };
//             swiperList.style.transform=`translateX(${value}px)`;
//             PAGE.data.index=index;
//             PAGE.data.translateX=value;
//             PAGE.data.isLock=false;
//             PAGE.highlight(index);
//         })
//     },
//     swiperPrev: function(){
//         let index=PAGE.data.index;
//         PAGE.goIndex(index-1);
//     },
//     swiperNext: function(){
//         let index=PAGE.data.index;
//         PAGE.goIndex(index+1);
//     },
//     swiperSwitch: function(event){
//         let index=event.target.dataset.index;
//         index=Number(index);
//         PAGE.goIndex(index);
//     },
//     highlight: function(index){
//         let swiperSwitch=document.getElementsByClassName('swiper-pagination-switch');
//         for(i=0;i<swiperSwitch.length;i++){
//             swiperSwitch[i].className='swiper-pagination-switch';
//         };
//         swiperSwitch[index].className='swiper-pagination-switch active';
//     },
//     swiperReset: function(){
//         let swiperList=document.getElementById('swiper-list');
//         let swiperItemWidth=swiperList.offsetWidth;
//         let index=PAGE.data.index;
//         let translateX=-(swiperItemWidth + swiperItemWidth*index);
//         PAGE.data.translateX=translateX;
//         PAGE.data.itemWidth=swiperItemWidth;
//         swiperList.style.transform=`translateX(${translateX}px)`
//     }
// };
// PAGE.init();



const PAGE={
    data: {
        index: 0,
        duration: 500,
        isLock: false,
        translateX: 0,
        defaultLength: null,
        itemWidth: null,
    },
    init: function(){
        this.bind();
        this.clone();
    },
    bind: function(){
        $("#swiper-prev").click(this.swiprePrev);
        $("#swiper-next").click(this.swiperNext);
        $(".swiper-pagination-switch").each(function(index){
            $(".swiper-pagination-switch")[index].setAttribute('data-index',index);
        });
        $(".swiper-pagination-switch").click(this.swiperSwitch);
        $(window).resize(this.swiperReset);
    },
    clone: function(){
        let index=PAGE.data.index;
        let swiperItemWidth=$("#swiper-list").outerWidth();
        PAGE.data.translateX=-(swiperItemWidth + swiperItemWidth*index);
        PAGE.data.defaultLength=$(".swiper-item").length;
        PAGE.data.itemWidth=swiperItemWidth;
        $(".swiper-item").first().clone().appendTo($("#swiper-list"));
        $(".swiper-item").eq(-2).clone().prependTo($("#swiper-list"));
        PAGE.goIndex(index);
    },
    goIndex: function(index){
        let swiperItemWidth=PAGE.data.itemWidth;
        let beginTranslateX=PAGE.data.translateX;
        let endTranslateX=-(swiperItemWidth + swiperItemWidth*index);
        let swiperDuration=PAGE.data.duration;
        if(PAGE.data.isLock){
            return
        }else{
            PAGE.data.isLock=true;
        };
        PAGE.ainmateTo(beginTranslateX,endTranslateX,swiperDuration,function(value){
            $("#swiper-list").css('transform',`translateX(${value}px)`);
        },function(value){
            let swiperLength=PAGE.data.defaultLength;
            if(index === -1){
                index=swiperLength-1;
                value=-(swiperItemWidth + swiperItemWidth*index);
            };
            if(index === swiperLength){
                index=0;
                value=-(swiperItemWidth + swiperItemWidth*index);
            };
            $("#swiper-list").css('transform',`translateX(${value}px)`);
            PAGE.data.index=index;
            PAGE.data.translateX=value;
            PAGE.data.isLock=false;
            PAGE.highlight(index);
        });
    },
    ainmateTo: function(begin,end,duration,changeCallback,finishCallback){
        let startTime=Date.now();
        requestAnimationFrame(function update(){
            let dataNow=Date.now();
            let time=dataNow-startTime;
            let value=PAGE.linear(time,begin,end,duration);
            typeof changeCallback === 'function' && changeCallback(value);
            if(startTime+duration > dataNow){
                requestAnimationFrame(update);
            }else{
                typeof finishCallback === 'function' && finishCallback(end);
            }
        })
    },
    linear: function(time,begin,end,duration){
        return (end-begin) * time / duration + begin;
    },
    swiprePrev: function(){
        let index=PAGE.data.index;
        PAGE.goIndex(index-1);
    },
    swiperNext: function(){
        let index=PAGE.data.index;
        PAGE.goIndex(index+1);
    },
    swiperSwitch: function(event){
        let index=event.target.dataset.index;
        index=Number(index);
        PAGE.goIndex(index);
    },
    highlight: function(index){
        $(".swiper-pagination-switch").each(function(index){
            $(".swiper-pagination-switch")[index].className='swiper-pagination-switch';
        });
        $(".swiper-pagination-switch")[index].className='swiper-pagination-switch active';
    },
    swiperReset: function(){
        let swiperItemWidth=$("#swiper-list").outerWidth();
        let index=PAGE.data.index;
        let translateX=-(swiperItemWidth + swiperItemWidth*index)
        PAGE.data.translateX=translateX;
        PAGE.data.itemWidth=swiperItemWidth;
        $("#swiper-list").css("transform",`translate(${translateX}px)`)
    },
};
PAGE.init();