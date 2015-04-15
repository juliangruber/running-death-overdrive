var bandcamp = require('node-bandcamp');
var Speaker = require('speaker');
var lame = require('lame');

var tracks = [
  { name: 'It begins', url: 'https://runningdeath.bandcamp.com/track/it-begins' },
  { name: 'Hell On Earth', url: 'https://runningdeath.bandcamp.com/track/hell-on-earth' },
  { name: 'Psycho?', url: 'https://runningdeath.bandcamp.com/track/psycho' },
  { name: 'Remote Controlled', url: 'https://runningdeath.bandcamp.com/track/remote-controlled' },
  { name: 'Close Minded', url: 'https://runningdeath.bandcamp.com/track/close-minded' },
  { name: 'Raging Nightmare', url: 'https://runningdeath.bandcamp.com/track/raging-nightmare-2' },
  { name: 'Deludium', url: 'https://runningdeath.bandcamp.com/track/deludium' },
  { name: 'Mercenary', url: 'https://runningdeath.bandcamp.com/track/mercenary' },
  { name: 'Pray for Death', url: 'https://runningdeath.bandcamp.com/track/pray-for-death-2' },
  { name: 'Reduced', url: 'https://runningdeath.bandcamp.com/track/reduced' },
  { name: 'Overdrive', url: 'https://runningdeath.bandcamp.com/track/overdrive' },
  { name: 'I See A Fire', url: 'https://runningdeath.bandcamp.com/track/i-see-a-fire' }
];


var decoder = new lame.Decoder();
var speaker = new Speaker();
decoder.pipe(speaker, { end: false });

console.log('Running Death - Overdrive');

(function next(i){
  var track = tracks[i];
  if (!track) return;

  bandcamp.getTrack(track.url)
  .then(function(stream){
    console.log('%s. %s', i+1, track.name);
    stream.on('end', function(){
      next(i + 1);
    });
    stream.pipe(decoder, { end: false });
  })
  .catch(function(err){
    throw err;
  });
})(0);

