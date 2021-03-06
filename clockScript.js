var dayOfTheWeek;
        var today = new Date();
        var date = today.getDate();
        var day = today.getDay();
        var month = today.getMonth();
        var year = today.getYear();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        var msec = today.getMilliseconds();

        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.canvas.width  = window.innerWidth* .9;
        ctx.canvas.height = window.innerHeight * .8;

        
        //Makes the radius of the circle for the clock
        var radius = canvas.height / 2;
        ctx.translate(window.innerWidth/2, radius);
        radius = radius * 0.90



        
        function startTime() {
            // Creates and intialises all of the variables.
            dayOfTheWeek;
            today = new Date();
            date = today.getDate();
            day = today.getDay();
            month = today.getMonth();
            year = today.getYear();
            h = today.getHours();
            m = today.getMinutes();
            s = today.getSeconds();
            msec = today.getMilliseconds();

            //Changes the day of the week based to the day number
            switch (day) {
                case 0:
                    dayOfTheWeek = "Sunday"
                    break;
                case 1:
                    dayOfTheWeek = "Monday"
                    break;
                case 2:
                    dayOfTheWeek = "Tuesday"
                    break;
                case 3:
                    dayOfTheWeek = "Wednesday"
                    break;
                case 4:
                    dayOfTheWeek = "Thursday"
                    break;
                case 5:
                    dayOfTheWeek = "Friday"
                    break;
                case 6:
                    dayOfTheWeek = "Saturday"
                    break;
                default:
                    dayOfTheWeek = "don't know"
                    break;
            }

            //Changes the minutes and the seconds and puts a zero in front if it is a single digit
            m = checkTime(m);
            s = checkTime(s);

            //Text is written into div txt
            document.getElementById('txt').innerHTML = h + ":" + m + ":" + s + ":" + msec + "<br>" + month + "/" + date + "/" + (year + 1900) + "<br>" + dayOfTheWeek;
            
            // Runs the code every milisecond, calling on its own function to infinately repeat the code
            var t = setTimeout(startTime, 1);
            drawClock();
        }
        
        //Turns any 1 digit day or month into two digits
        function checkTime(i) {
            if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
            return i;
        }
        
        //Draws the clock based on the functions
        function drawClock() {
            drawFace(ctx, radius);
            drawNumbers(ctx, radius);
            drawTime(ctx, radius);
        }

        //Makes the face of the dlock without the numbers
        function drawFace(ctx, radius) {

            //Makes the white circle
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2*Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.lineWidth = radius*0.1;
            ctx.stroke();

            //Makes the clock pivot
            ctx.beginPath();
            ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
            ctx.fillStyle = 'black';
            ctx.fill();
        }

        function drawNumbers(ctx, radius) {
            var ang;
            var num;
            ctx.font = radius*0.15 + "px arial";
            ctx.textBaseline="middle";
            ctx.textAlign="center";
            for(num = 1; num < 13; num++){
                ang = num * Math.PI / 6;
                ctx.rotate(ang);
                ctx.translate(0, -radius*0.85);
                ctx.rotate(-ang);
                ctx.fillText(num.toString(), 0, 0);
                ctx.rotate(ang);
                ctx.translate(0, radius*0.85);
                ctx.rotate(-ang);
            }
        }

        function drawTime(ctx, radius){
            //hour
            var hourLess12=h%12;

            //Makes the hour angle 
            var hourAngle=(hourLess12*Math.PI/6)+ (m*Math.PI/(6*60)) + (s*Math.PI/(360*60));
            drawHand(ctx, hourAngle, radius*0.5, radius*0.07);

            //minute angle
            var minuteAngle=(m*Math.PI/30)+(s*Math.PI/(30*60));
            drawHand(ctx, minuteAngle, radius*0.8, radius*0.07);

            // second angle
            var secondAngle=(s*Math.PI/30 + msec *Math.PI/30000);
            drawHand(ctx, secondAngle, radius*0.9, radius*0.02);
        }

        function drawHand(ctx, pos, length, width) {
            ctx.beginPath();
            ctx.lineWidth = width;
            ctx.lineCap = "round";
            ctx.moveTo(0,0);
            ctx.rotate(pos);
            ctx.lineTo(0, -length);
            ctx.stroke();
            ctx.rotate(-pos);
        }