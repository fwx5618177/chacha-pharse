#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;
uniform vec2 cardPosition;

void main(void) {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 toCenter = uv - cardPosition / resolution;
    float dist = length(toCenter);

    // 创建围绕中心旋转的光点
    float angle = atan(toCenter.y, toCenter.x) + time * 2.0;
    float radius = 0.2 + 0.05 * sin(angle * 6.0);
    float glow = 0.3 / abs(dist - radius);

    // 使光点逐渐消失
    float alpha = smoothstep(0.1, 0.2, glow) * smoothstep(0.3, 0.0, dist);

    gl_FragColor = vec4(vec3(1.0, 0.8, 0.5) * alpha, alpha);
}