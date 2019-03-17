	
    	//所有成语和释义
		var level1 = {
			level : ["海阔天空","行尸走肉","金蝉脱壳","百里挑一","春暖花开","逍遥法外","滥竽充数","青梅竹马"],
			tip : ["形容开阔，无拘无束。","比喻只有人的形体，不具备人最基本的感觉。","比喻制造或利用假象脱身，使对方不能及时发觉。","形容人才出众。","指春天气候温暖，百花盛开，景色优美。","指犯罪的人没有遭受法律应有的惩罚，仍旧自在无事。","比喻没有本领的人冒充有本领，占着位置。","形容男女小的时候天真无邪，在一起玩耍。"],
			num : 1,
		};
		var level2 = {
			level : ["情非得已","满腹经纶","兵临城下","金玉满堂","背水一战","天下无双","滔滔不绝","皆大欢喜"],
			tip : ["指情况出于不得已。","形容人有才学，有治理国家的才能。","比喻情势十分危急。","形容财富极多，也形容学识丰富。","指处于绝境之中，为求出路而决一死战。","形容出类拔萃，独一无二。","形容话很多，说起来没个完。","大家都很欢喜，都很满意。"],
			num : 2,
		};
		var level3 = {
			level : ["偷天换日","两小无猜","卧虎藏龙","珠光宝气","花花公子","相见恨晚","国色天香","石破天惊"],
			tip : ["比喻暗中改变事物的真相，以达到蒙混欺骗的目的。","形容男女从小感情纯真。","指隐藏着未被发现的人才或隐藏不露的人才。","形容妇女服饰华贵富丽，闪耀着珍宝的光色。","指衣着华丽，只会吃喝玩乐，不务正业的富家子弟。","形容一见如故，意气极其相投。","用牡丹花来形容女子的美丽。","形容文章议论新奇惊人。"],
			num : 3,
		};
		var level4 = {
			level : ["大器晚成","八仙过海","金玉良缘","掌上明珠","海市蜃楼","不吐不快","高山流水","买椟还珠"],
			tip : ["喻指越是大才能的人通常越晚成功。","比喻各自拿出本领或办法，互相竞赛。","泛指美好的姻缘。","比喻父母疼爱的儿女，多指女儿。","比喻虚幻的事物，也用来形容心中想到但不切合实际的幻想。","不说出来心里不舒服、不痛快。","比喻知音难遇或乐曲高妙。","比喻没有眼力，取舍不当。"],
			num : 4,
		};
		var level5 = {
			level : ["无忧无虑","无地自容","落叶归根","差强人意","惊天动地","相濡以沫","厚德载物","妄自菲薄"],
			tip : ["形容烦恼尽除，心情安然自得，快乐舒心。","没有地方可以让自己容身，形容非常羞愧。","比喻事物有一定的归宿。","表示勉强还算能让人接受。","形容某个事件的声势或意义极大。","比喻同在困难的处境里，用微薄的力量互相帮助。","指君子的品德应如大地般厚实可以承载万物。","指对自己的品德、能力等没有自信。"],
			num : 5,
		};

		var contentLi = document.getElementById("contentDiv").getElementsByTagName('li');
		var tips = document.getElementById("tipsSpan");
		var startBtn = document.getElementById("startBtn");
		var tipsDiv = document.getElementById("tipsDiv");
		var levelP = document.getElementById("levelDiv").getElementsByTagName('p')[0];


		function game(oLeve,fn){

			//给levelP加内容，然后初始化li的class
			levelP.innerHTML = "第"+oLeve.num+"关";

			for(var i=0; i<contentLi.length; i++){
				contentLi[i].className = "";
				startMove(contentLi[i],{opacity:100});
			};
			//把包含成语的数组转化成乱序字符串，添加到li中
			var levelStr = oLeve.level.join("");

			function shuffle(array) {
				for (var i = array.length - 1; i > 0; i--) {
					var j = Math.floor(Math.random() * (i + 1));
					var temp = array[i];
					array[i] = array[j];
					array[j] = temp;
				}
			    return array;
			};

			levelStr = shuffle(Array.from(levelStr)).join("");

			for(var i=0; i<levelStr.length; i++){
				contentLi[i].innerHTML = levelStr[i];
			};
			//给tip加内容
			tipsSpan.innerHTML = oLeve.tip[0];

			//点击提示按钮，提示一个成语，1秒后提示窗口消失
			answerBtn.onclick = function(){
				answerWindow.innerHTML = oLeve.level[0];
				answerWindow.style.display = "block";
				setTimeout(function(){
					answerWindow.style.display = "none";
				},1000);
			};

			for(var i=0; i<contentLi.length; i++){

				var onclickStr = "";
				//点击li之后把更改class，并把相应的字加到onclickStr字符串中
				contentLi[i].onclick = function(){
					if(this.className == ""){
						this.className = "downLi";
						onclickStr += this.innerHTML;
						//点击4次之后
						if(onclickStr.length == 4){

							var matchSomeone = oLeve.level.indexOf(onclickStr);
							//如果没有和已选字符串匹配的成语，清空className和已选字符串
							if (matchSomeone == -1) {
								for(var y=0; y<contentLi.length; y++){
									contentLi[y].className = "";
									onclickStr = "";
								}
							}
							//如果字符串和成语匹配成功，把数组中相应的成语和释义删除，并且已选中的li透明度变为0，li上的字符清空
							else{
								onclickStr = "";
								oLeve.level.splice(matchSomeone,1);
								oLeve.tip.splice(matchSomeone,1);
								tipsSpan.innerHTML = oLeve.tip[0];
								for(var x=0; x<contentLi.length; x++){
									contentLi[x].index = x;
									if(contentLi[x].className == "downLi"){
										startMove(contentLi[x],{opacity:0});
										contentLi[x].innerHTML = "";
									};
								};
								//当所有数组匹配成功，即数组为空时，再次调用game函数开始下一关
								if(oLeve.level == ""){
									fn();
								};
							};
						};
					}
					//被选中的li小于4个时，取消选择某个li
					else if(this.className == "downLi"){
						this.className = "";
						onclickStr = onclickStr.replace(this.innerHTML,"");
					}
				}
			};

		};


		function getStyle(obj,attr){
			if (obj.currentStyle) {
				return obj.currentStyle[attr];
			}
			else{
				return getComputedStyle(obj,false)[attr];
			}
		}

		function startMove(obj,json,fn){

			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				var bStop = true;

				for (var attr in json) {

					var iCur = 0;
					if(attr=="opacity"){
						iCur = parseInt(parseFloat(getStyle(obj,attr))*100);
					}	
					else{
						iCur = parseInt(getStyle(obj,attr));
					}

					var iSpeed = (json[attr] - iCur)/6;
					iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

					if(iCur != json[attr]){
						bStop = false;
					}

					if(attr=="opacity"){
						obj.style.filter = "alpha(opacity:"+(iCur + iSpeed)+")";
						obj.style.opacity = (iCur + iSpeed)/100;
					}
					else{
						obj.style[attr] = iCur + iSpeed + "px";
					}
				}

				if(bStop){
					clearInterval(obj.timer);

					if(fn){
						fn();
					}
				}
			},30)
		}

		//通关窗口、答案提示窗口位置
		var answerBtn = document.getElementById("answerBtn");
		var endWindow = document.getElementById("endWindow");
		var answerWindow = document.getElementById("answerWindow");
		endWindow.style.left = (document.documentElement.clientWidth - 200)/2 + "px";
		answerWindow.style.left = (document.documentElement.clientWidth - 200)/2 + "px";


		//点击开始按钮，按钮消失，关卡数、提示、li和提示按钮出现
		startBtn.onclick = function(){
			startBtn.style.display = "none";
			tipsDiv.style.display = "block";
			levelP.style.display = "block";
			answerBtn.style.display = "block";
			for(var i=0; i<contentLi.length; i++){
				contentLi[i].style.display = "block";
			};
		};


		//开始游戏
		game(level1,function(){
			game(level2,function(){
				game(level3,function(){
					game(level4,function(){
						game(level5,function(){
							endWindow.style.display = "block";
							tipsDiv.style.display = "none";
						})
					})
				})
			})
		});
