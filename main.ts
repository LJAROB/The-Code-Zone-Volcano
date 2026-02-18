namespace SpriteKind {
    export const Floor = SpriteKind.create()
}
function on_start () {
    info.setScore(0)
    floor.image.fill(14)
    floor.top = 117
    salamander.setPosition(80, 110)
    controller.moveSprite(salamander, 200, 0)
    salamander.setStayInScreen(true)
    scene.setBackgroundImage(assets.image`background`)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    salamander.setImage(assets.image`dino`)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    salamander.setImage(assets.image`dino0`)
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    info.changeScoreBy(1)
    scene.cameraShake(4, 100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(false)
})
let meteor: Sprite = null
let floor: Sprite = null
let salamander: Sprite = null
let fall_speed = 150
salamander = sprites.create(assets.image`dino`, SpriteKind.Player)
floor = sprites.create(image.create(180, 10), SpriteKind.Floor)
on_start()
game.onUpdate(function () {
    timer.throttle("action", 3000, function () {
        timer.after(100, function () {
            scene.setBackgroundImage(assets.image`background`)
        })
        timer.after(500, function () {
            scene.setBackgroundImage(assets.image`background0`)
        })
        timer.after(1000, function () {
            scene.setBackgroundImage(assets.image`background1`)
        })
    })
})
game.onUpdateRandomInterval(0, 1500, true, function () {
    meteor = sprites.create(assets.image`meteor`, SpriteKind.Enemy)
    meteor.x = randint(10, 150)
    meteor.bottom = 1
    meteor.setVelocity(randint(-15, 15), fall_speed)
    meteor.setFlag(SpriteFlag.AutoDestroy, true)
})
forever(function () {
    meteor.startEffect(effects.ashes)
    meteor.startEffect(effects.fire)
})
