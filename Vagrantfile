# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"
  
  config.vm.synced_folder "./src", "/home/vagrant/workspace"

  config.vm.network "forwarded_port", guest: 3000, host: 3000

  config.berkshelf.enabled = true

  config.vm.provision :chef_solo do |chef|    
    chef.add_recipe "nodejs"
    chef.add_recipe "mongodb::10gen_repo"
    chef.add_recipe "mongodb"
    chef.add_recipe "git"
  end  
end
