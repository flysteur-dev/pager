<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use App\Engine\FeedsImporter;

class FeedsImportCommand extends Command
{
    protected static $defaultName = 'feeds:import';

    public function __construct(FeedsImporter $feedsImporter)
    {
        parent::__construct();

        $this->feedsImporter = $feedsImporter;
    }

    protected function configure()
    {
        $this
            ->setDescription('Import les flux RSS.')
            // ->setHelp('')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->feedsImporter->importAll($output);
    }
}
