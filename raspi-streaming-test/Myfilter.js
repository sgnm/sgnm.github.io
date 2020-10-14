PIXI.filters.MyFilter = class extends PIXI.Filter {
  constructor() {
    const fragmentSrc = `
      precision mediump float;
      varying vec2 vTextureCoord;
      uniform sampler2D uSampler;
      varying vec4 vColor;

      uniform float time;

      void main(void) {
        vec2 cord = vTextureCoord;
        vec4 color = texture2D(uSampler, cord);
        float scanLineInterval = 1300.0; // 大きいほど幅狭く
        float scanLineSpeed = time * 5.0; // 走査線移動速度

        // 走査線
        float scanLine = max(1.0, sin(vTextureCoord.y * scanLineInterval + scanLineSpeed) * 2.0) * 0.5;

        color.rgb *= scanLine;

        gl_FragColor = color;
      }
    `;

    super(
      null, // vertex shader
      fragmentSrc, // fragment shader
      // uniforms
      {
        time : {type: '1f', value: 0.0},
      }
    );
  }
};