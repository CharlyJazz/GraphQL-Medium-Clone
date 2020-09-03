user_list = %w(Bart Kevin Max Rafael Charly Megan)

posts_length = 20

collections_length = 4

tag_length = 0

tag_file = YAML.load_file(Dir['tmp'][0] + '/tag.yml')

tag_file['tags'].each do |tag|
  Tag.create(name: tag)
  tag_length += 1
end

topics = {
  :Art=>"Feast your retinas",
  :Comics=>"All the panels and frames fit to print",
  :Culture=>"High, low, and sideways",
  :Film=>"Behind the silver screen",
  :Food=>"Farm to fridge",
  :Humor=>"Turn on, tune in, lol out",
  :Lit=>"Fiction and wordplay with depth",
  :Music=>"Liner notes",
  :Photography=>"Picture this",
  :Social_Media=>"Like it (or not)",
  :Sports=>"The beautiful game",
  :Business=>"From Airbnb to Zappos",
  :Economy=>"Follow the money",
  :Entrepreneurship=>"You're the boss",
  :Freelancing=>"Of invoicing and independence",
  :Marketing=>"Always be branding",
  :Productivity=>"Working with purpose",
  :Work=>"The meaning behind the meetings",
  :Artificial_Intelligence=>"Born to be bot",
  :Cryptocurrency=>"An ode to the anti-banks",
  :Cybersecurity=>"Towards a more perfect password",
  :Javascript=>"Javascript",
  :Data_Science=>"Query this",
  :Digital_Design=>"More than just a pretty typeface",
  :Programming=>"The good, the bad, the buggy",
  :Space=>"Boldly going",
  :Neuroscience=>"Playing the brain game",
  :Software_Engineering=>"Back-end to front-end",
  :Science=>"Of rocks and rockets",
  :Math=>"Add it up",
  :Family=>"Next gen",
  :Creativity=>"Of muses and mistakes",
  :Health=>"Body talk",
  :Mental_Health=>"A little more conversation, a little less stigma",
  :Psychology=>"It's all in your head",
  :Relationships=>"Love and other drugs",
  :Self=>"Live better",
  :Sexuality=>"Explore, embrace, repeat",
  :Spirituality=>"One big question, countless answers",
  :Wellness=>"Where soul meets body",
  :Travel=>"Get lost",
  :Education=>"Live it, learn it",
  :Environment=>"Blue and green and tread all over",
  :History=>"The past is prologue",
  :Equality=>"Typing truth to power",
  :Future=>"Dispatches from tomorrow",
  :Philosophy=>"Think about it",
  :World=>"Headlines that transcend borders",
  :Politics=>"The national 411",
  :Media=>"Where the newsroom is the news",
}

topics.each { |k,v|
  name = k.to_s.humanize(capitalize: false)
  description = v

  Topic.create(
    name: name,
    description: description,
    picture: 'picture.png'
  )
}

user_list.each do |name|
  User.create(
    username: name,
    last_name: 'First',
    first_name: 'Last',
    email: "#{name.downcase}@gmail.com",
    password: "1234",
    bio: "Cool Bio by: #{name.downcase}")
end

posts_length.times do |n|
  post = Post.create(
    body: BetterLorem.c(rand(300..800)),
    title: "Title #{n.to_s}",
    picture: "Image#{n.to_s}.png",
    user: User.find(rand(1..user_list.length)),
    topic: Topic.find(rand(1..topics.length))
  )

  rand(1..tag_length).times do |n|
    post.tags << Tag.find(n + 1)
  end

  rand(1..user_list.length).times do |n|
    Comment.create(
      body: BetterLorem.c(rand(20..100)),
      user: User.find(n + 1),
      post: post
    )
  end

  rand(1..user_list.length).times do |n|
    Bookmark.create(
      user: User.find(n + 1),
      post: post
    )
  end

  rand(1..user_list.length).times do |n|
    post.claps << Clap.new(
      user: User.find(n + 1),
      total: rand(1..10)
    )
  end
end

collections_length.times do |n|
  collection = Collection.create(
    title: BetterLorem.c(rand(2..15)),
    description: BetterLorem.c(rand(5..30)),
    picture: "Image#{n.to_s}.png",
    user: User.find(rand(1..user_list.length))
  )

  rand(1..posts_length).times do |n|
    collection.posts << Post.find(n + 1)
  end
end
