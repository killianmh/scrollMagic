$(document).ready(function () {
    var controller = new ScrollMagic.Controller();

    // uncomment addIndicators method call in each scene to see that scene's trigger and offsets

    // sidewinder
    // use GSAP position to animate rows at the same time
    var tl = new TimelineMax();
    tl.fromTo($(".split-row.top-row"), 1, { xPercent: 0, ease: Linear.easeNone }, { xPercent: -50, ease: Linear.easeNone });
    tl.fromTo($(".split-row.bottom-row"), 1, { xPercent: -50, ease: Linear.easeNone }, { xPercent: 0, ease: Linear.easeNone }, 0);

    new ScrollMagic.Scene({
        triggerElement: ".hero",
        triggerHook: 0,
        duration: "100%",
    })
        .setPin(".hero")
        .setTween(tl)
        .addIndicators({
            name: "sidewinder timeline",
            colorTrigger: "red",
            colorStart: "red",
            colorEnd: "red",
            indent: 40
        })
        .addTo(controller)


    // wiper
    // use GSAP position argument to add space between wipe animations (+=1)
    var tl = new TimelineMax();
    tl.from($(".intro .intro-2"), 1, { xPercent: 100, ease: Linear.easeNone }, "+=1");
    tl.from($(".intro .intro-3"), 1, { xPercent: 100, ease: Linear.easeNone }, "+=1");

    new ScrollMagic.Scene({
        triggerElement: ".intro",
        triggerHook: "onLeave",
        duration: "200%"
    })
        .setPin(".intro")
        .setTween(tl)
        // .addIndicators({
        //     name: "wiper timeline",
        //     colorTrigger: "white",
        //     colorStart: "white",
        //     colorEnd: "white",
        //     indent: 40 
        // })
        .addTo(controller)



    // skinny
    // use scrollmagic offset to pause between slide animations
    var skinny = $(".skinny");
    var skinnyChild = skinny.find(".skinny-item");
    var length = skinny.find(".skinny-item").length;
    var offset = window.innerHeight;

    new ScrollMagic.Scene({
        triggerElement: ".skinny",
        triggerHook: "onLeave",
        duration: "200%",
    })
        .setPin(".skinny")
        // .addIndicators({
        //     name: "skinny parent timeline",
        //     colorTrigger: "white",
        //     colorStart: "white",
        //     colorEnd: "white",
        //     indent: 40 
        // })
        .addTo(controller)

    for (i = 0; i <= length; i++) {
        new ScrollMagic.Scene({
            triggerElement: ".skinny",
            triggerHook: 0,
            offset: (i + 1) * (offset / 2)
        })
            .setClassToggle(skinnyChild[i], "thin")
            // .addIndicators({
            //     name: "skinny child timeline",
            //     colorTrigger: "red",
            //     colorStart: "red",
            //     colorEnd: "red",
            //     indent: 250 
            // })
            .addTo(controller)
    }



    // parallax

    $(".parallax .wrapper").each(function () {
        var tl = new TimelineMax();
        var child = $(this).find(".child");
        tl.to(child, 1, { y: -320, ease: Linear.easeNone });

        new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.5,
            duration: "100%"
        })
            .setTween(tl)
            // .addIndicators({
            //     name: "parallax timeline",
            //     colorTrigger: "red",
            //     colorStart: "red",
            //     colorEnd: "red",
            //     indent: 40 
            // })
            .addTo(controller)
    })



    // fade-slide
    // use scrollMagic scene.reverse() method to ensure animation only plays once 
    $(".fade-slide .wrapper").each(function () {
        var tl = new TimelineMax();
        var child = $(this).find(".child");
        var type = this.dataset.direction;
        switch (type) {
            case "top":
                tl.fromTo(child, 2, { top: "-100%" }, { top: "0%", ease: Elastic.easeOut.config(1, 0.3) })

                tl.fromTo(child, 2, { opacity: 0 }, { opacity: 1 }, 0)
                break;
            case "right":
                tl.fromTo(child, 2, { right: "-100%" }, { right: "0%", ease: Elastic.easeOut.config(1, 0.3) })

                tl.fromTo(child, 2, { opacity: 0 }, { opacity: 1 }, 0)
                break;
            case "bottom":
                tl.fromTo(child, 2, { bottom: "-100%" }, { bottom: "0%", ease: Elastic.easeOut.config(1, 0.3) })

                tl.fromTo(child, 2, { opacity: 0 }, { opacity: 1 }, 0)
                break;
            default:
                tl.fromTo(child, 2, { left: "-100%" }, { left: "0%", ease: Elastic.easeOut.config(1, 0.3) })

                tl.fromTo(child, 2, { opacity: 0 }, { opacity: 1 }, 0)

        }

        new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.5
        })
            .setTween(tl)
            // .addIndicators({
            //     name: "fade-slide timeline",
            //     colorTrigger: "red",
            //     colorStart: "red",
            //     colorEnd: "red",
            //     indent: 40 
            // })
            .addTo(controller)
            .reverse(false)
            
    })


})