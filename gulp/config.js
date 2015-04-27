var app = './app';
var tmp = './.tmp';
var dist = './dist';

module.exports = {
  dir: {
    app: app,
    tmp: tmp,
    dist: dist
  },
  connect: {
    htmlDir: app + '/htmls',
    staticDir: tmp,
    fixtures: './fixtures'
  },
  styles: {
    src: app + '/styles/*.scss',
    watchSrc: app + '/styles/**',
    dest: tmp + '/styles',
    settings: {
      imagePath: '/images' // Used by the image-url helper
    }
  },
  images: {
    src: app + '/images/**',
    dest: tmp + '/images'
  },
  htmls: {
    src: app + '/htmls/**',
    dest: tmp
  },
  browserify: {
    baseDir: app + '/scripts/',
    // Support multiple glob pattern
    src: [app + '/scripts/*.js'],
    dest: tmp + '/scripts',
    extensions: ['.hbs', '.jsx']
  },
  sprites: {
    src: './app/images/sprites/',
    imagesDest: './app/images/generated/',
    stylesDest: './app/styles/generated/',
    imgUrlRoot: '/images/generated/'
  },
  watch: {
    styles: 'app/styles/**',
    images: 'app/images/**',
    sprites: 'app/images/sprites/**',
    files: [
      'app/htmls/**',
      '.tmp/**',
      'fixtures/**'
    ]
  },
  production: {
    cdn: 'http://img.taotaosou.cn/tts-m99',
    htmlSrc: app + '/htmls/**/*.hbs',
    imgSrc: app + '/images/**',
    cssSrc: tmp + '/styles/*.css',
    jsSrc: tmp + '/scripts/*.js',
    htmlDest: dist + '/htmls',
    refScripts: dist + '/htmls/scripts/**/*',
    refScriptsDir: dist + '/htmls/scripts',
    staticDest: dist + '/static',
    imgDest: dist + '/static/images',
    cssDest: dist + '/static/styles',
    jsDest: dist + '/static/scripts',
    dest: dist
  },
  ssh: {
    test: {
      sshConfig: {
        host: '199.155.122.199',
        port: 22,
        username: 'root',
        password: 'testqa'
      },
      path: '/home/lvchaocai/resources/tts-m99/',
      dist: dist + '/',
      folders: ['htmls', 'static']
    },
    deploy: {
      sshConfig: {
        host: '10.0.0.36',
        port: 58022,
        username: 'patch',
        password: 'ta0ta0s0u'
      },
      path: '/home/patch/tts-m99/',
      dist: dist + '/',
      folders: ['static']
    }
  }
};